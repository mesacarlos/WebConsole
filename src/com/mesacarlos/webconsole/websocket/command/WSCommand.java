package com.mesacarlos.webconsole.websocket.command;

import org.java_websocket.WebSocket;

import com.mesacarlos.webconsole.websocket.WSServer;

public interface WSCommand {
	void execute(WSServer wsServer, WebSocket conn, String params);
}