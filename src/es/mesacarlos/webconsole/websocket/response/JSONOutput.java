package es.mesacarlos.webconsole.websocket.response;

public interface JSONOutput {
	/**
	 * Gets status code representing this message. See docs for code meanings.
	 * @return Status code representing this message
	 */
	int getStatusCode();
	
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