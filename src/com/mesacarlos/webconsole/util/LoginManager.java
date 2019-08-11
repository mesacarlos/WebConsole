package com.mesacarlos.webconsole.util;

import java.util.ArrayList;
import java.util.List;

public class LoginManager {
	private List<String> loggedInUsers = new ArrayList<String>();
	private static LoginManager instance;
	
	private LoginManager() {}
	
	public static LoginManager getInstance() {
		if(instance == null)
			instance = new LoginManager();
		return instance;
	}
	
	public void logIn(String address) {
		loggedInUsers.add(address);
	}
	
	public void logOut(String address) {
		loggedInUsers.remove(address);
	}
	
	public boolean isLoggedIn(String address) {
		return loggedInUsers.contains(address);
	}
}