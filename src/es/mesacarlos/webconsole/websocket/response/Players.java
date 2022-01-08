package es.mesacarlos.webconsole.websocket.response;

import java.util.List;

import com.google.gson.Gson;
import com.google.gson.JsonObject;

public class Players implements JSONOutput {

	private final String message;
	private final int connectedPlayers;
	private final int maxPlayers;
	private final List<String> connectedPlayersList;
	
	public Players(String message, int connectedPlayers, int maxPlayers, List<String> connectedPlayersList) {
		this.message = message;
		this.connectedPlayers = connectedPlayers;
		this.maxPlayers = maxPlayers;
		this.connectedPlayersList = connectedPlayersList;
	}
	
	@Override
	public int getStatusCode() {
		return 1000;
	}
	
	@Override
	public String getMessage() {
		return message;
	}
	
	public int getConnectedPlayers() {
		return connectedPlayers;
	}

	public int getMaxPlayers() {
		return maxPlayers;
	}

	@Override
	public String toJSON() {
		JsonObject object = new JsonObject();
		object.addProperty("status", getStatusCode());
		object.addProperty("statusDescription", "Players");
		object.addProperty("connectedPlayers", getConnectedPlayers());
		object.addProperty("maxPlayers", getMaxPlayers());
		object.addProperty("players", new Gson().toJson(connectedPlayersList));
		object.addProperty("message", getMessage());
		return object.toString();
	}

}