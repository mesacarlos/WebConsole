package es.mesacarlos.webconsole.websocket.response;

import com.google.gson.JsonObject;

import es.mesacarlos.webconsole.config.UserType;

public class LoggedIn implements JSONOutput {

	private final String message;
	private String respondsTo;
	private String username;
	private UserType as;
	private String token;
	
	public LoggedIn(String message) {
		this.message = message;
	}
	
	public LoggedIn(String message, String respondsTo, String username, UserType as, String token) {
		this.message = message;
		this.respondsTo = respondsTo;
		this.username = username;
		this.as = as;
		this.token = token;
	}
	
	@Override
	public int getStatusCode() {
		return 200;
	}
	
	@Override
	public String getMessage() {
		return message;
	}
	
	/**
	 * The command that originated this response
	 * @return WebSockets full command and parameters
	 */
	private String getRespondsTo() {
		return respondsTo;
	}
	
	
	public String getUsername() {
		return username;
	}

	public String getAs() {
		switch(as) {
			case ADMIN:
				return "ADMIN";
			default:
				return "VIEWER"; //This is not a security hole bc its just informative...
		}
	}
	
	private String getToken() {
		return token;
	}
	
	@Override
	public String toJSON() {
		JsonObject object = new JsonObject();
		object.addProperty("status", getStatusCode());
		object.addProperty("statusDescription", "LoggedIn");
		object.addProperty("respondsTo", getRespondsTo());
		object.addProperty("username", getUsername());
		object.addProperty("as", getAs());
		object.addProperty("token", getToken());
		object.addProperty("message", getMessage());
		return object.toString();
	}

}