package com.mesacarlos.webconsole.websocket;

import java.net.InetSocketAddress;
import java.util.Collection;
import java.util.HashMap;

import org.bukkit.Bukkit;
import org.java_websocket.WebSocket;
import org.java_websocket.handshake.ClientHandshake;
import org.java_websocket.server.WebSocketServer;

import com.mesacarlos.webconsole.WebConsole;
import com.mesacarlos.webconsole.util.LoginManager;
import com.mesacarlos.webconsole.websocket.command.CommandFactory;
import com.mesacarlos.webconsole.websocket.command.WSCommand;
import com.mesacarlos.webconsole.websocket.response.ConsoleOutput;
import com.mesacarlos.webconsole.websocket.response.JSONOutput;
import com.mesacarlos.webconsole.websocket.response.LoginRequired;
import com.mesacarlos.webconsole.websocket.response.Processed;
import com.mesacarlos.webconsole.websocket.response.UnknownCommand;

public class WSServer extends WebSocketServer {
	private HashMap<String, WSCommand> commands = CommandFactory.getCommandsHashMap();
	private WebConsole plugin;

	public WSServer(WebConsole plugin, InetSocketAddress address) {
		super(address);
		this.plugin = plugin;
	}

	@Override
	public void onOpen(WebSocket conn, ClientHandshake handshake) {
		if(LoginManager.getInstance().isLoggedIn(conn.getRemoteSocketAddress()))
			sendToClient(conn, new Processed("Connected. Already logged in, welcome back!"));
		else
			sendToClient(conn, new LoginRequired("Connection started, waiting login"));
		Bukkit.getLogger().info("[WebConsole] Connected and waiting login from " + conn.getRemoteSocketAddress());
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
			//Command does not exist
			sendToClient(conn, new UnknownCommand("Unknown command", message));
			Bukkit.getLogger().info(
					"[WebConsole] Signal '" + message + "' was not processed since is not valid. Is your plugin/web interface up to date?");
		} else if (!LoginManager.getInstance().isLoggedIn(conn.getRemoteSocketAddress())
				&& !wsCommand.equals("LOGIN")) {
			//User is not authorised. DO NOTHING, IMPORTANT!
			sendToClient(conn, new LoginRequired("Forbidden"));
			Bukkit.getLogger().warning("[WebConsole] " + conn.getRemoteSocketAddress()
					+ " tried to run '" + message + "' while not logged in!");
		} else {
			cmd.execute(this, conn, wsCommandParams);
		}
	}

	@Override
	public void onClose(WebSocket conn, int code, String reason, boolean remote) {
		LoginManager.getInstance().logOut(conn.getRemoteSocketAddress());
		Bukkit.getLogger()
				.info("[WebConsole] Closed WS connection " + conn.getRemoteSocketAddress());
	}

	@Override
	public void onError(WebSocket conn, Exception ex) {
		Bukkit.getLogger()
				.warning("[WebConsole] Error occured on connection " + conn.getRemoteSocketAddress() + ":" + ex);
	}

	@Override
	public void onStart() {
		Bukkit.getLogger().info("[WebConsole] WebSocket Server started successfully");
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
	 * @param conn Connection to client
	 * @param content JSONOutput object
	 */
	public void sendToClient(WebSocket conn, JSONOutput content) {
		conn.send(content.toJSON());
	}

}