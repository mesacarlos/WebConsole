package com.mesacarlos.webconsole.json;

public interface JSONOutput {
	/**
	 * Gets status code representing this message. See docs for code meanings.
	 * @return Status code representing this message
	 */
	int getStatusCode();
	
	/**
	 * Returns the command sended by client who created this response.
	 * In case of a server-generated response (like ConsoleOutput), this will be null
	 * @return
	 */
	String getRespondsTo();
	
	/**
	 * Explanatory message of this response
	 * @return Explanatory message of this response
	 */
	String getMessage();
	
	/**
	 * Coverts this object into JSON, ready to send it over WS
	 * @return JSON Object Stringified
	 */
	String toJSON();
}