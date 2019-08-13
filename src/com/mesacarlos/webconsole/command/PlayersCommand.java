package com.mesacarlos.webconsole.command;

import org.bukkit.Bukkit;
import org.java_websocket.WebSocket;

import com.mesacarlos.webconsole.json.Players;
import com.mesacarlos.webconsole.websockets.WSServer;

public class PlayersCommand implements WSCommand{

	@Override
	public void execute(WSServer wsServer, WebSocket conn, String params) {
		int connectedPlayers = Bukkit.getOnlinePlayers().size();
		int maxPlayers = Bukkit.getMaxPlayers();
		
		wsServer.sendToClient(conn, new Players("Currently " + connectedPlayers + " connected players for a maximum of " + maxPlayers, connectedPlayers, maxPlayers));
	}
	
}