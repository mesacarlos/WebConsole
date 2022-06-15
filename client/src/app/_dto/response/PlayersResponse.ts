import { WebSocketResponse } from "./WebSocketResponse";

export interface PlayersResponse extends WebSocketResponse {
	connectedPlayers: number;
	maxPlayers: number;
	players: string[];
}