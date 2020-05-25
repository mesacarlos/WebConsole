package es.mesacarlos.webconsole.util;

import java.net.InetSocketAddress;
import java.util.ArrayList;

public class LoginManager {
	private ArrayList<InetSocketAddress> loggedInUsers = new ArrayList<InetSocketAddress>();
	private static LoginManager instance;
	
	private LoginManager() {}
	
	public static LoginManager getInstance() {
		if(instance == null)
			instance = new LoginManager();
		return instance;
	}
	
	/**
	 * Logs user in
	 * @param address User to login
	 */
	public void logIn(InetSocketAddress address) {
		loggedInUsers.add(address);
	}
	
	/**
	 * Logs user out
	 * @param address User to logout
	 */
	public void logOut(InetSocketAddress address) {
		loggedInUsers.remove(address);
	}
	
	/**
	 * Check if user is logged in
	 * @param address User to check
	 * @return true if user is logged in, false otherwise
	 */
	public boolean isLoggedIn(InetSocketAddress address) {
		return loggedInUsers.contains(address);
	}
	
	/**
	 * Retrieve the full logged-in user list
	 * @return list of logged in users
	 */
	public ArrayList<InetSocketAddress> getLoggedInUsers() {
		return loggedInUsers;
	}
}