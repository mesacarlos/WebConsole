package es.mesacarlos.webconsole.websocket.response;

import com.google.gson.JsonObject;

public class UnknownCommand implements JSONOutput {

	private final String message;
	private final String respondsTo;
	
	public UnknownCommand(String message, String respondsTo) {
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
	
	/**
	 * The command that originated this response
	 * @return WebSockets full command and parameters
	 */
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