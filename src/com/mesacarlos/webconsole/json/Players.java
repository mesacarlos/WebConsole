package com.mesacarlos.webconsole.json;

import com.google.gson.JsonObject;

public class Players implements JSONOutput{
	private String message;
	private int connectedPlayers;
	private int maxPlayers;
	
	public Players(String message, int connectedPlayers, int maxPlayers) {
		this.message = message;
		this.connectedPlayers = connectedPlayers;
		this.maxPlayers = maxPlayers;
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
		object.addProperty("message", getMessage());
		return object.toString();
	}

}