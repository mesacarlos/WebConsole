import { Subject } from "rxjs/internal/Subject";
import { WebSocketCommand } from "./command/WebSocketCommand";
import { ConnectionStatusEnum } from "./ConnectionStatusEnum";
import { WebSocketResponse } from "./response/WebSocketResponse";

export interface ActiveConnectionDto {
	serverName: string;
	subject$: Subject<WebSocketResponse>;
	connectionStatus: ConnectionStatusEnum;
	receivedMessages: WebSocketResponse[];
	sentCommands: WebSocketCommand[];
	isLoggedIn: boolean;
	token?: string;
}