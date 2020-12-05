package es.mesacarlos.webconsole.websocket.command;

import java.util.UUID;

import org.bukkit.Bukkit;
import org.java_websocket.WebSocket;

import es.mesacarlos.webconsole.auth.LoginManager;
import es.mesacarlos.webconsole.auth.ConnectedUser;
import es.mesacarlos.webconsole.config.ConfigManager;
import es.mesacarlos.webconsole.config.UserData;
import es.mesacarlos.webconsole.util.Internationalization;
import es.mesacarlos.webconsole.websocket.WSServer;
import es.mesacarlos.webconsole.websocket.response.LoginRequired;
import es.mesacarlos.webconsole.websocket.response.LoggedIn;

public class LogInCommand implements WSCommand {
	
	@Override
	public void execute(WSServer wsServer, WebSocket conn, String password) {
		// If user is logged in, then return.
		if (LoginManager.getInstance().isSocketConnected(conn.getRemoteSocketAddress()))
			return;
		
		//Check if user exists
		for(UserData ud : ConfigManager.getInstance().getAllUsers()) {
			if(ud.getPassword().equals(password)) {
				ConnectedUser user = new ConnectedUser(conn.getRemoteSocketAddress(), ud.getUsername(), UUID.randomUUID().toString(), ud.getUserType());
				LoginManager.getInstance().logIn(user);
				
				wsServer.sendToClient(conn, new LoggedIn(Internationalization.getPhrase("login-sucessful-message"), "LOGIN ********", user.getUsername(), user.getUserType(), user.getToken()));
				Bukkit.getLogger().info(Internationalization.getPhrase("login-sucessful-console", user.toString()));
				return;
			}
		}
		wsServer.sendToClient(conn, new LoginRequired(Internationalization.getPhrase("login-failed-message")));
		Bukkit.getLogger().info(Internationalization.getPhrase("login-failed-console", conn.getRemoteSocketAddress()));
	}

}