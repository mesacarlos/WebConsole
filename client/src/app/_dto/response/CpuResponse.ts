import { WebSocketResponse } from "./WebSocketResponse";

export interface CpuResponse extends WebSocketResponse{
	usage: number;
}