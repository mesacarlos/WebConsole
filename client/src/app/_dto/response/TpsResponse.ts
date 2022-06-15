import { WebSocketResponse } from "./WebSocketResponse";

export interface TpsResponse extends WebSocketResponse{
	tps: number;
}