package es.mesacarlos.webconsole.auth;

import java.net.InetSocketAddress;

import es.mesacarlos.webconsole.config.UserType;
import es.mesacarlos.webconsole.util.Internationalization;

public class ConnectedUser {
	private String username;
	private InetSocketAddress socketAddress;
	private String token;
	private UserType userType;
	
	public ConnectedUser(InetSocketAddress socketAddress, String username, String token, UserType userType) {
		this.socketAddress = socketAddress;
		this.username = username;
		this.token = token;
		this.userType = userType;
	}
	
	public String getUsername() {
		return username;
	}
	
	public InetSocketAddress getSocketAddress() {
		return socketAddress;
	}
	
	public String getToken() {
		return token;
	}
	
	public UserType getUserType() {
		return userType;
	}
	
	public String toString() {
		return Internationalization.getPhrase("user-tostring", username, socketAddress, userType);
	}
}