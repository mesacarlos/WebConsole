package es.mesacarlos.webconsole.websocket.command;

import java.util.ArrayList;
import java.util.List;

import org.bukkit.Bukkit;
import org.bukkit.entity.Player;
import org.java_websocket.WebSocket;

import es.mesacarlos.webconsole.util.Internationalization;
import es.mesacarlos.webconsole.websocket.WSServer;
import es.mesacarlos.webconsole.websocket.response.Players;

public class PlayersCommand implements WSCommand{

	@Override
	public void execute(WSServer wsServer, WebSocket conn, String params) {
		List<String> connectedPlayersList = new ArrayList<String>();
		for(Player player : Bukkit.getOnlinePlayers()) {
			connectedPlayersList.add(player.getName());
		}
		
		int connectedPlayers = connectedPlayersList.size();
		int maxPlayers = Bukkit.getMaxPlayers();
		
		wsServer.sendToClient(conn, 
			new Players(
				Internationalization.getPhrase("players-message", connectedPlayers, maxPlayers),
				connectedPlayers,
				maxPlayers,
				connectedPlayersList
			));
	}
	
}