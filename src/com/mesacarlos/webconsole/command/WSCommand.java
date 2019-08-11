package com.mesacarlos.webconsole.command;

import org.java_websocket.WebSocket;

import com.mesacarlos.webconsole.websockets.WSServer;

public interface WSCommand {
	void execute(WSServer wsServer, WebSocket conn, String params);
}