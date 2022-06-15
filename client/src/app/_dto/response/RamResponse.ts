import { WebSocketResponse } from "./WebSocketResponse";

export interface RamResponse extends WebSocketResponse{
	free: number;
	used: number;
	max: number;
}