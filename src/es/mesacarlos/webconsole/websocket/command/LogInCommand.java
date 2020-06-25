package es.mesacarlos.webconsole.websocket.command;

import org.bukkit.Bukkit;
import org.java_websocket.WebSocket;

import es.mesacarlos.webconsole.auth.LoginManager;
import es.mesacarlos.webconsole.auth.PasswordManager;
import es.mesacarlos.webconsole.auth.User;
import es.mesacarlos.webconsole.auth.UserType;
import es.mesacarlos.webconsole.util.Internationalization;
import es.mesacarlos.webconsole.websocket.WSServer;
import es.mesacarlos.webconsole.websocket.response.LoginRequired;
import es.mesacarlos.webconsole.websocket.response.LoggedIn;

public class LogInCommand implements WSCommand {
	
	@Override
	public void execute(WSServer wsServer, WebSocket conn, String password) {
		// If user is logged in, then return.
		if (LoginManager.getInstance().isLoggedIn(conn.getRemoteSocketAddress()))
			return;
		
		//Check user type and login is password is valid
		switch(PasswordManager.isValidUser(password)) {
			case ADMIN:
				login(wsServer, conn, PasswordManager.isValidAdminPassword(password), UserType.ADMIN);
				break;
			case VIEWER:
				login(wsServer, conn, PasswordManager.isValidViewerPassword(password), UserType.VIEWER);
				break;
			default:
				wsServer.sendToClient(conn, new LoginRequired(Internationalization.getPhrase("login-failed-message")));
				Bukkit.getLogger().info(Internationalization.getPhrase("login-failed-console", conn.getRemoteSocketAddress()));
				break;
		}
		
	}
	
	private void login(WSServer wsServer, WebSocket conn, String username, UserType as) {
		User user = new User(conn.getRemoteSocketAddress(), username, as);
		LoginManager.getInstance().logIn(user);
		
		wsServer.sendToClient(conn, new LoggedIn(Internationalization.getPhrase("login-sucessful-message"), "LOGIN ********", user.getUsername(), user.getUserType()));
		Bukkit.getLogger().info(Internationalization.getPhrase("login-sucessful-console", user.toString()));
	}

}