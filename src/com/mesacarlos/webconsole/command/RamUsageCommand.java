package com.mesacarlos.webconsole.command;

import org.java_websocket.WebSocket;

import com.mesacarlos.webconsole.json.RamUsage;
import com.mesacarlos.webconsole.websockets.WSServer;

public class RamUsageCommand implements WSCommand {

	@Override
	public void execute(WSServer wsServer, WebSocket conn, String params) {
		Runtime r = Runtime.getRuntime();
		
		long free = r.freeMemory() / 1024 / 1024;
		long max = r.maxMemory() / 1024 / 1024;
		long used = max - free;
		
		wsServer.sendToClient(conn,
				new RamUsage(free + " free, " + used + " used, " + max + " maximum memory", free, used, max));
	}

}