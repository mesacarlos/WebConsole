package es.mesacarlos.webconsole.websocket.response;

import com.google.gson.JsonObject;

public class CpuUsage implements JSONOutput {

	private final String message;
	private final double usage;

	public CpuUsage(String message, double usage) {
		this.message = message;
		this.usage = usage;
	}

	@Override
	public int getStatusCode() {
		return 1001;
	}

	@Override
	public String getMessage() {
		return message;
	}
	
	/**
	 * Gets system CPU Usage
	 * @return Global CPU Usage
	 */
	public double getUsage() {
		return usage;
	}
	
	@Override
	public String toJSON() {
		JsonObject object = new JsonObject();
		object.addProperty("status", getStatusCode());
		object.addProperty("statusDescription", "CPU Usage");
		object.addProperty("usage", getUsage());
		object.addProperty("message", getMessage());
		return object.toString();
	}
	
}