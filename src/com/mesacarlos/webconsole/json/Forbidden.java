package com.mesacarlos.webconsole.json;

import com.google.gson.JsonObject;

public class Forbidden implements JSONOutput{
	private String message;
	private String respondsTo;
	
	public Forbidden(String message, String respondsTo) {
		this.message = message;
		this.respondsTo = respondsTo;
	}
	
	@Override
	public int getStatusCode() {
		return 403;
	}

	@Override
	public String getRespondsTo() {
		return respondsTo;
	}
	
	@Override
	public String getMessage() {
		return message;
	}

	@Override
	public String toJSON() {
		JsonObject object = new JsonObject();
		object.addProperty("status", getStatusCode());
		object.addProperty("statusDescription", "Forbidden");
		object.addProperty("respondsTo", getRespondsTo());
		object.addProperty("message", getMessage());
		return object.toString();
	}

}