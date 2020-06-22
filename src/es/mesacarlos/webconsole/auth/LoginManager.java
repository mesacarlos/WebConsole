package es.mesacarlos.webconsole.auth;

import java.net.InetSocketAddress;
import java.util.ArrayList;

public class LoginManager {
	private ArrayList<User> loggedInUsers = new ArrayList<User>();
	private static LoginManager instance;
	
	private LoginManager() {}
	
	public static LoginManager getInstance() {
		if(instance == null)
			instance = new LoginManager();
		return instance;
	}
	
	/**
	 * Logs user in
	 * @param user User to login
	 */
	public void logIn(User user) {
		loggedInUsers.add(user);
	}
	
	/**
	 * Logs user out
	 * @param address User to logout
	 */
	public void logOut(InetSocketAddress address) {
		for(User user : loggedInUsers)
			if(user.getSocketAddress().equals(address))
				loggedInUsers.remove(user);
	}
	
	/**
	 * Get user object by socket
	 * @param address socket of the user
	 * @return User object, null if no user logged in from that address
	 */
	public User getUser(InetSocketAddress address) {
		for(User user : loggedInUsers)
			if(user.getSocketAddress().equals(address))
				return user;
		return null;
	}
	
	/**
	 * Check if user is logged in
	 * @param address User to check
	 * @return true if user is logged in, false otherwise
	 */
	public boolean isLoggedIn(InetSocketAddress address) {
		for(User user : loggedInUsers)
			if(user.getSocketAddress().equals(address))
				return true;
		return false;
	}
	
	/**
	 * Retrieve the full logged-in user list
	 * @return list of logged in users
	 */
	public ArrayList<User> getLoggedInUsers() {
		return loggedInUsers;
	}
	
}