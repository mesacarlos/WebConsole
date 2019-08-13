package com.mesacarlos.webconsole.json;

import com.google.gson.JsonObject;

public class ConsoleOutput implements JSONOutput{
	private String message;
	
	public ConsoleOutput(String message) {
		this.message = message;
	}
	
	@Override
	public int getStatusCode() {
		return 10;
	}

	@Override
	public String getMessage() {
		return message;
	}

	@Override
	public String toJSON() {
		JsonObject object = new JsonObject();
		object.addProperty("status", getStatusCode());
		object.addProperty("statusDescription", "Console Output");
		object.addProperty("message", getMessage());
		return object.toString();
	}

}