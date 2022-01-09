package es.mesacarlos.webconsole.websocket.response;

import com.google.gson.JsonObject;

public class ConsoleOutput implements JSONOutput {

	private final String message;
	private final String time;
	
	public ConsoleOutput(String message, String time) {
		this.message = message;
		this.time = time;
	}
	
	@Override
	public int getStatusCode() {
		return 10;
	}

	@Override
	public String getMessage() {
		return message;
	}
	
	public String getTime() {
		return time;
	}

	@Override
	public String toJSON() {
		JsonObject object = new JsonObject();
		object.addProperty("status", getStatusCode());
		object.addProperty("statusDescription", "Console Output");
		object.addProperty("time", getTime());
		object.addProperty("message", getMessage());
		return object.toString();
	}

}