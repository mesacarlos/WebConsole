package es.mesacarlos.webconsole.auth;

import java.net.InetSocketAddress;
import java.util.ArrayList;
import java.util.Map;

import org.bukkit.Bukkit;

import es.mesacarlos.webconsole.WebConsole;

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
	
	/**
	 * Check if the provided password corresponds to any admin
	 * @param password Provided password
	 * @return Name of the user if password corresponds to a valid admin, null if is a viewer or an invalid password
	 */
	public String isValidAdminPassword(String password) {
		WebConsole plugin = (WebConsole)Bukkit.getPluginManager().getPlugin("WebConsole");
		Map<String, Object> passwords = plugin.getConfig().getConfigurationSection("passwords").getConfigurationSection("admin").getValues(false);
		
		for(Map.Entry<String, Object> entry : passwords.entrySet()) {
			String pwd = (String)entry.getValue();
			if(pwd.equals(password))
				return entry.getKey();
		}
		return null;
	}
	
	/**
	 * Check if the provided password corresponds to any viewer
	 * @param password Provided password
	 * @return Name of the user if password corresponds to a valid viewer, null if is a admin or invalid password
	 */
	public String isValidViewerPassword(String password) {
		WebConsole plugin = (WebConsole)Bukkit.getPluginManager().getPlugin("WebConsole");
		Map<String, Object> passwords = plugin.getConfig().getConfigurationSection("passwords").getConfigurationSection("viewer").getValues(false);
		
		for(Map.Entry<String, Object> entry : passwords.entrySet()) {
			String pwd = (String)entry.getValue();
			if(pwd.equals(password))
				return entry.getKey();
		}
		return null;
	}
	
	public UserType isValidUser(String password) {
		//Check if is an admin
		String username = isValidAdminPassword(password);
		if(username != null)
			return UserType.ADMIN;
		
		//Check if is a viewer
		username = isValidViewerPassword(password);
		if(username != null)
			return UserType.VIEWER;
		
		//He is nothing
		return UserType.UNKNOWN;
	}
}