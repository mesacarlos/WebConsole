package com.mesacarlos.webconsole.command;

import org.bukkit.Bukkit;
import org.java_websocket.WebSocket;

import com.mesacarlos.webconsole.util.LoginManager;
import com.mesacarlos.webconsole.websockets.WSServer;

public class LogInCommand implements WSCommand{

	@Override
	public void execute(WSServer wsServer, WebSocket conn, String password) {
		//If user is logged in, then return.
		if(LoginManager.getInstance().isLoggedIn(conn.getRemoteSocketAddress().getAddress().toString()))
			return;
		
		//Get password from config files
		String receivedPassword = wsServer.getMainClass().getConfig().getString("password");
		
		if(receivedPassword.equals(password)) {
			//Password is correct, logging in
			LoginManager.getInstance().logIn(conn.getRemoteSocketAddress().getAddress().toString());
			conn.send("200 Logged In");
			Bukkit.getLogger().info("[WebConsole] Successfully logged in from " + conn.getRemoteSocketAddress());
		}else {
			conn.send("403 Forbidden");
			Bukkit.getLogger().info("[WebConsole] Password incorrect while login from " + conn.getRemoteSocketAddress());
		}
	}
	
}