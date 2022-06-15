import { Injectable } from '@angular/core';
import { map, Observable, Observer, Subject } from 'rxjs';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { ActiveConnectionDto } from '../_dto/ActiveConnectionDto';
import { WebSocketCommand } from '../_dto/command/WebSocketCommand';
import { WebSocketCommandEnum } from '../_dto/command/WebSocketCommandEnum';
import { ConnectionStatusEnum } from '../_dto/ConnectionStatusEnum';
import { ConsoleOutputResponse } from '../_dto/response/ConsoleOutputResponse';
import { CpuResponse } from '../_dto/response/CpuResponse';
import { LoggedInResponse } from '../_dto/response/LoggedInResponse';
import { LoginRequiredResponse } from '../_dto/response/LoginRequiredResponse';
import { PlayersResponse } from '../_dto/response/PlayersResponse';
import { RamResponse } from '../_dto/response/RamResponse';
import { TpsResponse } from '../_dto/response/TpsResponse';
import { UnknownCommandResponse } from '../_dto/response/UnknownCommandResponse';
import { WebSocketResponse } from '../_dto/response/WebSocketResponse';
import { ServerDto } from '../_dto/ServerDto';
import { SettingsEnum, StorageService } from './storage.service';

@Injectable({
	providedIn: 'root'
})
export class WebconsoleService {

	//Array as Index Signature which stores ActiveConnectionDto. This object 
	private activeConnections: ActiveConnectionDto[] = [];
	//WebSocket connections stored separately, as we want all interactions with WebSockets to be done from this service.
	private webSocketClients: { [key: string]: WebSocket | undefined } = {};
	//Subject used to notify subscribers when a server is connected or disconnected
	private activeConnectionsChangedSubject$: Subject<void> = new Subject<void>();

	constructor(
		private storageService: StorageService,
	) { }

	/**
	 * Returns a list containing the server names WebConsole is currently connected to
	 * @returns List of Server names
	 */
	public getCurrentConnectedServers(): string[] {
		return this.activeConnections.map(e => e.serverName);
	}

	/**
	 * Notifies subscribers when a server is connected or disconnected
	 * @returns Subject used to notify when a server is connected or disconnected
	 */
	public getActiveConnectionsChangedSubject(): Subject<void> {
		return this.activeConnectionsChangedSubject$;
	}

	/**
	 * Connects to a server or returns previously created one
	 * @param serverName Name of the server to connect to
	 * @returns Created connection or previously created one, if not closed.
	 */
	public connect(serverName: string): ActiveConnectionDto {
		//If already connected to this server, return the already created Subject
		const activeConnection = this.activeConnections.find(e => e.serverName == serverName);
		if (activeConnection) {
			return activeConnection;
		}

		//If not already connected, connect to server
		const server: ServerDto | undefined = this.storageService.getServer(serverName);
		if (!server)
			throw Error("Server not found");

		console.log(`Connecting to ${serverName} (${server.serverURI})`);
		const connection = this.createConnection(serverName, server.serverURI);

		//Save connection and return it
		this.activeConnections.push(connection);
		this.activeConnectionsChangedSubject$.next();
		return connection;
	}

	/**
	 * Establish WS connection
	 * @param serverUri WebSockets URI
	 * @returns Created AnonimousSubject for this server
	 */
	private createConnection(serverName: string, serverUri: string): ActiveConnectionDto {
		const ws = new WebSocket(serverUri);

		const newConnection: ActiveConnectionDto = {
			serverName: serverName,
			subject$: new Subject<WebSocketResponse>(),
			connectionStatus: ConnectionStatusEnum.Connecting,
			receivedMessages: [],
			sentCommands: [],
			isLoggedIn: false
		}

		ws.onopen = (ev) => newConnection.connectionStatus = ConnectionStatusEnum.Connected;
		ws.onerror = (err) => newConnection.subject$.error(err);
		ws.onclose = () => this.closeConnection(serverName);
		ws.onmessage = (msg) => {
			//Parse raw message to an actual Object
			let parsedResponse: WebSocketResponse = this.parseResponse(msg, newConnection);
			//Save response
			newConnection.receivedMessages.push(parsedResponse);
			//Emit to subscribers
			newConnection.subject$.next(parsedResponse);
		}

		//Store WebSocket client
		this.webSocketClients[serverName] = ws;

		//Return connection
		return newConnection;
	}

	/**
	 * Receives raw message from server and parses it to a actual WebSocketResponse object
	 * @param response 
	 */
	private parseResponse(response: MessageEvent<string>, newConnection: ActiveConnectionDto): WebSocketResponse {
		let parsedJson = JSON.parse(response.data) as WebSocketResponse;
		switch (parsedJson.status) {
			case 10:
				//Console output
				return parsedJson as ConsoleOutputResponse;
			case 200:
				//LoggedIn
				const r = parsedJson as LoggedInResponse;
				newConnection.isLoggedIn = true;
				newConnection.token = r.token;

				if (this.storageService.getSetting(SettingsEnum.RetrieveLogFile))
					this.sendMessage(newConnection.serverName, WebSocketCommandEnum.ReadLogFile);
				return r;
			case 400:
				//Unknown
				return parsedJson as UnknownCommandResponse;
			case 401:
				//Login Required
				return parsedJson as LoginRequiredResponse;
			case 1000:
				//Players
				return parsedJson as PlayersResponse;
			case 1001:
				//CPU Usage
				return parsedJson as CpuResponse;
			case 1002:
				//RAM usage
				return parsedJson as RamResponse;
			case 1003:
				//TPS
				return parsedJson as TpsResponse;
			default:
				//Not recognised response
				console.error("Unrecognised response:", response);
				return parsedJson;
		}
	}

	/**
	 * Send a command to a given server
	 * @param serverName Name of the server the command is being sent to
	 * @param command Command to send
	 */
	public sendMessage(serverName: string, commandType: WebSocketCommandEnum, params?: string): void {
		//Get ActiveConnection from array
		const serverConnection = this.activeConnections.find(e => e.serverName === serverName);
		if (!serverConnection)
			throw Error(`ActiveConnection not found for server ${serverName} whilst trying to send a message.`);

		//Get WebSocket client from array. If not found, throw error
		const ws = this.webSocketClients[serverName];
		if (!ws)
			throw Error(`WebSocket client not found for server ${serverName} whilst trying to send a message.`);

		//Build and send command if socket is open.
		if (ws.readyState === WebSocket.OPEN) {
			const command: WebSocketCommand = {
				command: commandType,
				params: params,
				token: serverConnection.token
			}
			ws.send(JSON.stringify(command));
			serverConnection.sentCommands.push(command);
		} else {
			console.error(`Message to ${serverName} NOT sent because socket is not open yet.`);
		}
	}

	/**
	 * Close connection with a server. This method needs to be here in order to be able to modify activeConnections$
	 * @param serverName Server name which wants connection to be closed
	 */
	public closeConnection(serverName: string): void {
		const serverConnection = this.activeConnections.find(e => e.serverName === serverName);

		if (serverConnection) {
			serverConnection.subject$.complete();
			serverConnection.connectionStatus = ConnectionStatusEnum.Disconnected;
			this.webSocketClients[serverName] = undefined;
			this.activeConnections = this.activeConnections.filter(e => e.serverName !== serverName);
			this.activeConnectionsChangedSubject$.next();
		}
	}

}
