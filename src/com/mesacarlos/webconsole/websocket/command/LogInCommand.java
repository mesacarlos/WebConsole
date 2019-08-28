package com.mesacarlos.webconsole.websocket.command;

import org.bukkit.Bukkit;
import org.java_websocket.WebSocket;

import com.mesacarlos.webconsole.util.Internationalization;
import com.mesacarlos.webconsole.util.LoginManager;
import com.mesacarlos.webconsole.websocket.WSServer;
import com.mesacarlos.webconsole.websocket.response.LoginRequired;
import com.mesacarlos.webconsole.websocket.response.Processed;

public class LogInCommand implements WSCommand {

	@Override
	public void execute(WSServer wsServer, WebSocket conn, String password) {
		// If user is logged in, then return.
		if (LoginManager.getInstance().isLoggedIn(conn.getRemoteSocketAddress()))
			return;

		// Get password from config files
		String receivedPassword = wsServer.getMainClass().getConfig().getString("password");

		if (receivedPassword.equals(password)) {
			// Password is correct, logging in
			LoginManager.getInstance().logIn(conn.getRemoteSocketAddress());
			wsServer.sendToClient(conn, new Processed(Internationalization.getPhrase("login-sucessful-message"), "LOGIN ********"));
			Bukkit.getLogger().info(Internationalization.getPhrase("login-sucessful-console", conn.getRemoteSocketAddress()));
		} else {
			// Password was incorrect
			wsServer.sendToClient(conn, new LoginRequired(Internationalization.getPhrase("login-failed-message")));
			Bukkit.getLogger().info(Internationalization.getPhrase("login-failed-console", conn.getRemoteSocketAddress()));
		}
	}

}