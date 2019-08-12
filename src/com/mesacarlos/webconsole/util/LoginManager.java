package com.mesacarlos.webconsole.util;

import java.net.InetSocketAddress;
import java.util.ArrayList;
import java.util.List;

public class LoginManager {
	private List<InetSocketAddress> loggedInUsers = new ArrayList<InetSocketAddress>();
	private static LoginManager instance;
	
	private LoginManager() {}
	
	public static LoginManager getInstance() {
		if(instance == null)
			instance = new LoginManager();
		return instance;
	}
	
	public void logIn(InetSocketAddress address) {
		loggedInUsers.add(address);
	}
	
	public void logOut(InetSocketAddress address) {
		loggedInUsers.remove(address);
	}
	
	public boolean isLoggedIn(InetSocketAddress address) {
		return loggedInUsers.contains(address);
	}
}