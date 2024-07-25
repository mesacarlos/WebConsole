import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Icons } from 'src/app/shared/icons';
import { ActiveConnectionDto } from 'src/app/_dto/ActiveConnectionDto';
import { WebSocketCommand } from 'src/app/_dto/command/WebSocketCommand';
import { WebSocketCommandEnum } from 'src/app/_dto/command/WebSocketCommandEnum';
import { ConnectionStatusEnum } from 'src/app/_dto/ConnectionStatusEnum';
import { ConsoleOutputResponse } from 'src/app/_dto/response/ConsoleOutputResponse';
import { CpuResponse } from 'src/app/_dto/response/CpuResponse';
import { LoggedInResponse } from 'src/app/_dto/response/LoggedInResponse';
import { LoginRequiredResponse } from 'src/app/_dto/response/LoginRequiredResponse';
import { PlayersResponse } from 'src/app/_dto/response/PlayersResponse';
import { RamResponse } from 'src/app/_dto/response/RamResponse';
import { TpsResponse } from 'src/app/_dto/response/TpsResponse';
import { UnknownCommandResponse } from 'src/app/_dto/response/UnknownCommandResponse';
import { WebSocketResponse } from 'src/app/_dto/response/WebSocketResponse';
import { ServerDto } from 'src/app/_dto/ServerDto';
import { SettingsEnum, StorageService } from 'src/app/_services/storage.service';
import { WebconsoleService } from 'src/app/_services/webconsole.service';
import { AnsiUp } from "ansi_up"

@Component({
	selector: 'app-console',
	templateUrl: './console.component.html',
	styleUrls: ['./console.component.scss']
})
export class ConsoleComponent implements OnInit, AfterViewInit, OnDestroy {
	//General stuff
	icons = Icons;
	server!: ServerDto; //Server info
	activeConnection!: ActiveConnectionDto; //Active connection object (which stores messages received, messages sent, subject, etc.)
	subscription!: Subscription; //Current subscription by this component
	//Content of the console
	@ViewChild("consoleDiv", { static: false }) consoleDiv!: ElementRef;
	consoleHtml: string = "";
	//Password modal
	@ViewChild("setPasswordModal", { static: false }) passwordModal!: ElementRef;
	//Command input
	@ViewChild("commandInput", { static: false }) commandInput!: ElementRef;
	//Server Insights
	connectedPlayers: number = 0;
	maxPlayers: number = 0;
	cpuUsage: number = 0;
	ramFree: number = 0;
	ramUsed: number = 0;
	ramMax: number = 0;
	tps: number = 0;

	//Helper properties
	keepScrollDown: boolean = true;
	showServerInfo: boolean = true;
	showConsole: boolean = false;
	loggedInUsername: string = "";
	loggedInAs: string = "";
	savedPasswordSent: boolean = false;
	browsingCommandHistoryIndex: number = -1;
	insightsInverval!: any;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private storageService: StorageService,
		private webConsoleService: WebconsoleService,
		private modalService: NgbModal,
	) { }

	/**
	 * On component initialization, connect to WebSocket server and subscribe to subjects (where WebSocket messages are received)
	 */
	ngOnInit(): void {
		console.log("Init console component");
		//Get server name from params
		const routeParams: ParamMap = this.route.snapshot.paramMap;
		const serverName = routeParams.get('serverName');

		//If server name not provided, throw error and redirect to homepage
		if (!serverName) {
			this.router.navigate(['']);
			throw Error("Server name not provided");
		}

		//Get server from its name. If not found, redirect to homepage
		const serverObject = this.storageService.getServer(serverName);

		if (!serverObject) {
			this.router.navigate(['']);
			throw Error("Server name invalid");
		}

		//Save server object and connect
		this.server = serverObject;

		//Connect to server
		this.activeConnection = this.webConsoleService.connect(this.server.serverName);
		this.showConsole = this.activeConnection.connectionStatus == ConnectionStatusEnum.Connected;

		//Process old messages (In case we are resuming a session)
		this.activeConnection.receivedMessages.forEach(e => this.processMessage(e));

		//If not created, create the Players, CPU, RAM and TPS interval
		if (!this.insightsInverval) {
			this.insightsInverval = setInterval(() => {
				this.requestServerInsights();
			}, 2500);
		}

		//Subscribe to Subject to process received messages
		this.subscription = this.activeConnection.subject$.subscribe({
			next: (msg: WebSocketResponse) => {
				this.showConsole = true;
				this.processMessage(msg);
			},
			complete: () => {
				//Disconnected from server
				this.showServerInfo = false;
			}
		});
	}

	ngAfterViewInit(): void {
		//Scroll down console
		setTimeout(() => this.consoleDiv.nativeElement.scrollTop = this.consoleDiv?.nativeElement.scrollHeight)
	}

	/**
	 * On component destruction, unsubscribe to subject
	 */
	ngOnDestroy(): void {
		//Stop insights
		clearInterval(this.insightsInverval);
		//Remove subscription as this component is going mayday
		this.subscription.unsubscribe();
	}

	/**
	 * Process a new message from WebSockets
	 * @param response WebSocket message
	 */
	processMessage(response: WebSocketResponse): void {
		// console.log(`Received message from WebSocket (${this.server.serverName}): `, msg);
		let r;
		switch (response.status) {
			case 10:
				//Console output
				r = response as ConsoleOutputResponse;
				this.writeToWebConsole(r.message, r.time);
				break;
			case 200:
				//LoggedIn
				r = response as LoggedInResponse;
				this.loggedInUsername = r.username;
				this.loggedInAs = r.as;
				break;
			case 400:
				//Unknown
				r = response as UnknownCommandResponse;
				console.log("400 Unknown Comamnd", r);
				break;
			case 401:
				//Login Required
				r = response as LoginRequiredResponse;
				if (!this.activeConnection.isLoggedIn) {
					if (this.server.serverPassword && !this.savedPasswordSent) {
						this.savedPasswordSent = true;
						this.webConsoleService.sendMessage(this.server.serverName, WebSocketCommandEnum.Login, this.server.serverPassword);
					} else {
						this.requestPassword();
					}
				}
				break;
			case 1000:
				//Players
				r = response as PlayersResponse;
				this.connectedPlayers = r.connectedPlayers;
				this.maxPlayers = r.maxPlayers;
				break;
			case 1001:
				//CPU Usage
				r = response as CpuResponse;
				this.cpuUsage = r.usage;
				break;
			case 1002:
				//RAM usage
				r = response as RamResponse;
				this.ramFree = r.free;
				this.ramUsed = r.used;
				this.ramMax = r.max;
				break;
			case 1003:
				//TPS
				r = response as TpsResponse;
				this.tps = r.tps;
				break;
			default:
				//Not recognised response
				console.error("Unrecognised response:", response);
				break;
		}
	}

	/**
	 * Sanitize and print message to console
	 * @param msg Message to print
	 * @param time Time, if applicable
	 */
	private writeToWebConsole(msg: string, time: string) {
		this.keepScrollDown = this.consoleDiv?.nativeElement.scrollHeight - this.consoleDiv?.nativeElement.scrollTop === this.consoleDiv?.nativeElement.clientHeight;

		//Write to div, replacing < to &lt; (to avoid XSS) and replacing new line to br.
		msg = msg.replace(/</g, "&lt;");
		msg = msg.replace(/(?:\r\n|\r|\n)/g, "<br>");

		//Color filter for MC codes.
		msg = msg.replace(/§0/g, "<span style='color: #000000;'>"); //&0
		msg = msg.replace(/§1/g, "<span style='color: #0000AA;'>"); //&1
		msg = msg.replace(/§2/g, "<span style='color: #00AA00;'>"); //&2
		msg = msg.replace(/§3/g, "<span style='color: #00AAAA;'>"); //&3
		msg = msg.replace(/§4/g, "<span style='color: #AA0000;'>"); //&4
		msg = msg.replace(/§5/g, "<span style='color: #AA00AA;'>"); //&5
		msg = msg.replace(/§6/g, "<span style='color: #FFAA00;'>"); //&6
		msg = msg.replace(/§7/g, "<span style='color: #AAAAAA;'>"); //&7
		msg = msg.replace(/§8/g, "<span style='color: #555555;'>"); //&8
		msg = msg.replace(/§9/g, "<span style='color: #5555FF;'>"); //&9
		msg = msg.replace(/§a/g, "<span style='color: #55FF55;'>"); //&a
		msg = msg.replace(/§b/g, "<span style='color: #55FFFF;'>"); //&b
		msg = msg.replace(/§c/g, "<span style='color: #FF5555;'>"); //&c
		msg = msg.replace(/§d/g, "<span style='color: #FF55FF;'>"); //&d
		msg = msg.replace(/§e/g, "<span style='color: #FFFF55;'>"); //&e
		msg = msg.replace(/§f/g, "<span style='color: #FFFFFF;'>"); //&f

		msg = msg.replace(/§l/g, "<span style='font-weight:bold;'>"); //&l
		msg = msg.replace(/§m/g, "<span style='text-decoration: line-through;'>"); //&m
		msg = msg.replace(/§n/g, "<span style='text-decoration: underline;'>"); //&n
		msg = msg.replace(/§o/g, "<span style='font-style: italic;'>"); //&o

		msg = msg.replace(/§r/g, "</span>");  //&r

		//Color filter for MC 1.18 (Also easy :D)
		msg = msg.replace(/0/g, "<span style='color: #000000;'>"); //&0
		msg = msg.replace(/1/g, "<span style='color: #0000AA;'>"); //&1
		msg = msg.replace(/2/g, "<span style='color: #00AA00;'>"); //&2
		msg = msg.replace(/3/g, "<span style='color: #00AAAA;'>"); //&3
		msg = msg.replace(/4/g, "<span style='color: #AA0000;'>"); //&4
		msg = msg.replace(/5/g, "<span style='color: #AA00AA;'>"); //&5
		msg = msg.replace(/6/g, "<span style='color: #FFAA00;'>"); //&6
		msg = msg.replace(/7/g, "<span style='color: #AAAAAA;'>"); //&7
		msg = msg.replace(/8/g, "<span style='color: #555555;'>"); //&8
		msg = msg.replace(/9/g, "<span style='color: #5555FF;'>"); //&9
		msg = msg.replace(/a/g, "<span style='color: #55FF55;'>"); //&a
		msg = msg.replace(/b/g, "<span style='color: #55FFFF;'>"); //&b
		msg = msg.replace(/c/g, "<span style='color: #FF5555;'>"); //&c
		msg = msg.replace(/d/g, "<span style='color: #FF55FF;'>"); //&d
		msg = msg.replace(/e/g, "<span style='color: #FFFF55;'>"); //&e
		msg = msg.replace(/f/g, "<span style='color: #FFFFFF;'>"); //&f

		msg = msg.replace(/l/g, "<span style='font-weight:bold;'>"); //&l
		msg = msg.replace(/m/g, "<span style='text-decoration: line-through;'>"); //&m
		msg = msg.replace(/n/g, "<span style='text-decoration: underline;'>"); //&n
		msg = msg.replace(/o/g, "<span style='font-style: italic;'>"); //&o

		msg = msg.replace(/r/g, "</span>");  //&r

		// ANSI Processing
		var ansi_up = new AnsiUp();
    	msg = ansi_up.ansi_to_html(msg);
		
		//Append datetime if enabled
		if (this.storageService.getSetting(SettingsEnum.DateTimePrefix)) {
			if (typeof time !== 'undefined' && time !== null) //if time is present and not null
				msg = "[" + time + "] " + msg;
			else if (typeof time !== 'undefined' && time === null) //if time is present and null
				null; //no time (is already printed)
			else
				msg = "[" + new Date().toLocaleTimeString() + "] " + msg;
		}

		//Append HTML
		const spanCount = (msg.match(/<span /g) || []).length; //Number of times a color is applied
		const spanCloseCount = (msg.match(/<\/span> /g) || []).length; //Number of already existing </span>
		const numberOfUnclosedSpans: number = spanCount - spanCloseCount; //Number of </span> pending to be closed
		this.consoleHtml += msg + ("</span>".repeat(numberOfUnclosedSpans)) + "<br>"; //Append to console the message, plus the required </span>'s, plus a line break
	}

	/**
	 * Open password request modal
	 */
	requestPassword(): void {
		this.modalService.open(this.passwordModal, { size: 'md' });
	}

	/**
	 * Try to login against server
	 * @param password Password to send
	 * @param rememberPassword If true, save password in localStorage
	 */
	setPassword(password: string, rememberPassword: boolean): void {
		//Edit server if remember password checkbox is checked
		if (rememberPassword)
			this.storageService.saveServer(this.server.serverName, this.server.serverURI, password);

		setTimeout(() => this.savedPasswordSent = true, 200)

		//Send login message
		this.webConsoleService.sendMessage(this.server.serverName, WebSocketCommandEnum.Login, password);
	}

	/**
	 * Send command typed in the command input
	 */
	sendCommand(): void {
		const cmd: string = this.commandInput.nativeElement.value;
		if (!cmd)
			return;

		//Clear input
		this.commandInput.nativeElement.value = "";
		this.browsingCommandHistoryIndex = -1;
		this.webConsoleService.sendMessage(this.server.serverName, WebSocketCommandEnum.Exec, cmd);
	}

	/**
	 * Called when a key is pressed in the command input
	 * @param e KeyboardEvent
	 */
	onKeyUpCommandInput(e: KeyboardEvent): void {
		if (e.code === 'Enter') { //Detect enter key
			this.sendCommand();
		} else if (e.code === "ArrowUp") { //Replace with older command
			//Get list of sent commands
			const sentCommands: WebSocketCommand[] = this.activeConnection.sentCommands.filter(e => e.command === WebSocketCommandEnum.Exec);

			//If no command was sent yet, return
			if (sentCommands.length == 0)
				return;

			//If this is the first time arrow up is pressed, start browsing history
			if (this.browsingCommandHistoryIndex <= 0)
				this.browsingCommandHistoryIndex = sentCommands.length;

			//Set command in our input component
			this.commandInput.nativeElement.value = sentCommands[this.browsingCommandHistoryIndex - 1]?.params;
			this.browsingCommandHistoryIndex = this.browsingCommandHistoryIndex - 1;
		} else if (e.code === "ArrowDown") { //Replace with newer command
			//Get list of sent commands
			const sentCommands: WebSocketCommand[] = this.activeConnection.sentCommands.filter(e => e.command === WebSocketCommandEnum.Exec);

			//If not browsing history, do nothing
			if (this.browsingCommandHistoryIndex !== -1) {
				//Go back to index 0 if overflow
				if (this.browsingCommandHistoryIndex >= sentCommands.length - 1)
					this.browsingCommandHistoryIndex = -1;

				//Set command in our input component
				this.commandInput.nativeElement.value = sentCommands[this.browsingCommandHistoryIndex + 1]?.params;
				this.browsingCommandHistoryIndex = this.browsingCommandHistoryIndex + 1;
			}
		} else if (e.code == "tab") { //Detect tab key
			//Suggest user from connected Players
			//TODO tab not being detected :(
		}
	}

	/**
	 * Request server insights
	 */
	requestServerInsights(): void {
		if (this.showServerInfo && this.showConsole && this.activeConnection.connectionStatus == ConnectionStatusEnum.Connected && this.activeConnection.isLoggedIn) {
			this.webConsoleService.sendMessage(this.server.serverName, WebSocketCommandEnum.Players);
			this.webConsoleService.sendMessage(this.server.serverName, WebSocketCommandEnum.CpuUsage);
			this.webConsoleService.sendMessage(this.server.serverName, WebSocketCommandEnum.RamUsage);
			this.webConsoleService.sendMessage(this.server.serverName, WebSocketCommandEnum.Tps);
		}

	}

}
