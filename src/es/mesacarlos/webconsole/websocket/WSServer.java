package es.mesacarlos.webconsole.websocket;

import java.net.InetSocketAddress;
import java.util.Collection;
import java.util.HashMap;

import org.bukkit.Bukkit;
import org.java_websocket.WebSocket;
import org.java_websocket.handshake.ClientHandshake;
import org.java_websocket.server.WebSocketServer;

import es.mesacarlos.webconsole.WebConsole;
import es.mesacarlos.webconsole.util.Internationalization;
import es.mesacarlos.webconsole.util.LoginManager;
import es.mesacarlos.webconsole.websocket.command.CommandFactory;
import es.mesacarlos.webconsole.websocket.command.WSCommand;
import es.mesacarlos.webconsole.websocket.response.ConsoleOutput;
import es.mesacarlos.webconsole.websocket.response.JSONOutput;
import es.mesacarlos.webconsole.websocket.response.LoginRequired;
import es.mesacarlos.webconsole.websocket.response.Processed;
import es.mesacarlos.webconsole.websocket.response.UnknownCommand;

public class WSServer extends WebSocketServer {
	private HashMap<String, WSCommand> commands = CommandFactory.getCommandsHashMap();
	private WebConsole plugin;

	public WSServer(WebConsole plugin, InetSocketAddress address) {
		super(address);
		this.plugin = plugin;
	}

	@Override
	public void onOpen(WebSocket conn, ClientHandshake handshake) {
		if (LoginManager.getInstance().isLoggedIn(conn.getRemoteSocketAddress())) {
			sendToClient(conn, new Processed(Internationalization.getPhrase("connection-resumed-message")));
			Bukkit.getLogger().info(Internationalization.getPhrase("connection-resumed-console", conn.getRemoteSocketAddress()));
		} else {
			sendToClient(conn, new LoginRequired(Internationalization.getPhrase("connection-login-message")));
			Bukkit.getLogger().info(Internationalization.getPhrase("connection-login-console", conn.getRemoteSocketAddress()));
		}
	}

	@Override
	public void onMessage(WebSocket conn, String message) {
		// Get command and params
		String wsCommand = message.split(" ")[0];
		String wsCommandParams = "";
		if (message.contains(" "))
			wsCommandParams = message.split(" ", 2)[1];

		// Run command
		WSCommand cmd = commands.get(wsCommand);

		if (cmd == null) {
			// Command does not exist
			sendToClient(conn, new UnknownCommand(Internationalization.getPhrase("unknown-command-message"), message));
			Bukkit.getLogger().info(Internationalization.getPhrase("unknown-command-console", message));
		} else if (!LoginManager.getInstance().isLoggedIn(conn.getRemoteSocketAddress())
				&& !wsCommand.equals("LOGIN")) {
			// User is not authorised. DO NOTHING, IMPORTANT!
			sendToClient(conn, new LoginRequired(Internationalization.getPhrase("forbidden-message")));
			Bukkit.getLogger().warning(Internationalization.getPhrase("forbidden-console", conn.getRemoteSocketAddress(), message));
		} else {
			cmd.execute(this, conn, wsCommandParams);
		}
	}

	@Override
	public void onClose(WebSocket conn, int code, String reason, boolean remote) {
		LoginManager.getInstance().logOut(conn.getRemoteSocketAddress());
		Bukkit.getLogger().info(Internationalization.getPhrase("closed-connection", conn.getRemoteSocketAddress()));
	}

	@Override
	public void onError(WebSocket conn, Exception ex) {
		Bukkit.getLogger().warning(Internationalization.getPhrase("error-on-connection", conn.getRemoteSocketAddress(), ex));
	}

	@Override
	public void onStart() {
		Bukkit.getLogger().info(Internationalization.getPhrase("started-websocket"));
	}

	/**
	 * Returns main class
	 * @return Main plugin class
	 */
	public WebConsole getMainClass() {
		return plugin;
	}

	/**
	 * Sends the message to all connected AND logged-in users
	 */
	public void onNewConsoleLinePrinted(String line) {
		Collection<WebSocket> connections = getConnections();
		for (WebSocket connection : connections) {
			if (LoginManager.getInstance().isLoggedIn(connection.getRemoteSocketAddress()))
				sendToClient(connection, new ConsoleOutput(line));
		}
	}

	/**
	 * Sends this JSONOutput to client
	 * @param conn    Connection to client
	 * @param content JSONOutput object
	 */
	public void sendToClient(WebSocket conn, JSONOutput content) {
		conn.send(content.toJSON());
	}

}