package es.mesacarlos.webconsole.auth;

import es.mesacarlos.webconsole.config.ConfigManager;
import es.mesacarlos.webconsole.config.UserData;

public class PasswordManager {
	
	/**
	 * Get the user type of a given password
	 * @param password Password to check
	 * @return ADMIN if password correspond to a admin user, VIEWER if viewer or UNKNOWN if invalid password
	 */
	public static UserType isValidUser(String password) {
		//Check if is an admin
		String username = getAdminUsernameFromPassword(password);
		if(username != null)
			return UserType.ADMIN;
		
		//Check if is a viewer
		username = getViewerUsernameFromPassword(password);
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
	public static String getAdminUsernameFromPassword(String password) {
		for(UserData ud : ConfigManager.getInstance().getAdmins())
			if(ud.getPassword().equals(password))
				return ud.getUsername();
		return null;
	}
	
	/**
	 * Check if the provided password corresponds to any viewer
	 * @param password Provided password
	 * @return Name of the user if password corresponds to a valid viewer, null if is a admin or invalid password
	 */
	public static String getViewerUsernameFromPassword(String password) {
		for(UserData ud : ConfigManager.getInstance().getViewers())
			if(ud.getPassword().equals(password))
				return ud.getUsername();
		return null;
	}
	
}