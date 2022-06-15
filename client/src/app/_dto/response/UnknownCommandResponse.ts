import { WebSocketResponse } from "./WebSocketResponse";

export interface UnknownCommandResponse extends WebSocketResponse{
	respondsTo: string;
}