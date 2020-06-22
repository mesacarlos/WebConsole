package es.mesacarlos.webconsole.auth;

import java.util.Map;

import org.bukkit.Bukkit;

import es.mesacarlos.webconsole.WebConsole;

public class PasswordManager {
	
	/**
	 * Get the user type of a given password
	 * @param password Password to check
	 * @return ADMIN if password correspond to a admin user, VIEWER if viewer or UNKNOWN if invalid password
	 */
	public static UserType isValidUser(String password) {
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
	
	/**
	 * Check if the provided password corresponds to any admin
	 * @param password Provided password
	 * @return Name of the user if password corresponds to a valid admin, null if is a viewer or an invalid password
	 */
	public static String isValidAdminPassword(String password) {
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
	public static String isValidViewerPassword(String password) {
		WebConsole plugin = (WebConsole)Bukkit.getPluginManager().getPlugin("WebConsole");
		Map<String, Object> passwords = plugin.getConfig().getConfigurationSection("passwords").getConfigurationSection("viewer").getValues(false);
		
		for(Map.Entry<String, Object> entry : passwords.entrySet()) {
			String pwd = (String)entry.getValue();
			if(pwd.equals(password))
				return entry.getKey();
		}
		return null;
	}
	
}