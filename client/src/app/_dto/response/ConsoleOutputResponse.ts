import { WebSocketResponse } from "./WebSocketResponse";

export interface ConsoleOutputResponse extends WebSocketResponse{
	time: string;
	message: string;
}