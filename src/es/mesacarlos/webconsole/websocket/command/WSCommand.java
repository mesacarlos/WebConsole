package es.mesacarlos.webconsole.websocket.command;

import org.java_websocket.WebSocket;

import es.mesacarlos.webconsole.websocket.WSServer;

public interface WSCommand {
	void execute(WSServer wsServer, WebSocket conn, String params);
}