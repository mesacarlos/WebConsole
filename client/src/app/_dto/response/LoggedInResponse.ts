import { WebSocketResponse } from "./WebSocketResponse";

export interface LoggedInResponse extends WebSocketResponse{
	respondsTo: string;
	username: string;
	as: string;
	token: string;
}