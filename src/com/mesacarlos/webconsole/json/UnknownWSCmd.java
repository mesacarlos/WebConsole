package com.mesacarlos.webconsole.json;

import com.google.gson.JsonObject;

public class UnknownWSCmd implements JSONOutput{
	private String message;
	private String respondsTo;
	
	public UnknownWSCmd(String message, String respondsTo) {
		this.message = message;
		this.respondsTo = respondsTo;
	}
	
	@Override
	public int getStatusCode() {
		return 400;
	}
	
	@Override
	public String getMessage() {
		return message;
	}
	
	@Override
	public String getRespondsTo() {
		return respondsTo;
	}
	
	@Override
	public String toJSON() {
		JsonObject object = new JsonObject();
		object.addProperty("status", getStatusCode());
		object.addProperty("statusDescription", "Unknown Command");
		object.addProperty("respondsTo", getRespondsTo());
		object.addProperty("message", getMessage());
		return object.toString();
	}
}