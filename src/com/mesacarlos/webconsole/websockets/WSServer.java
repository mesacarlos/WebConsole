package com.mesacarlos.webconsole.websockets;

import java.net.InetSocketAddress;
import java.util.Collection;
import java.util.HashMap;

import org.bukkit.Bukkit;
import org.java_websocket.WebSocket;
import org.java_websocket.handshake.ClientHandshake;
import org.java_websocket.server.WebSocketServer;

import com.mesacarlos.webconsole.WebConsole;
import com.mesacarlos.webconsole.command.CommandFactory;
import com.mesacarlos.webconsole.command.WSCommand;
import com.mesacarlos.webconsole.util.LoginManager;

public class WSServer extends WebSocketServer {
	private WebConsole plugin;
	private HashMap<String, WSCommand> commands = CommandFactory.getCommandsHashMap();

	public WSServer(WebConsole plugin, InetSocketAddress address) {
		super(address);
		this.plugin = plugin;
	}

	@Override
	public void onOpen(WebSocket conn, ClientHandshake handshake) {
		conn.send("Connection started, waiting login");
		Bukkit.getLogger().info("[WebConsole] Connected and waiting login from " + conn.getRemoteSocketAddress());
	}

	@Override
	public void onMessage(WebSocket conn, String message) {
		// Log this action to console
		Bukkit.getLogger().info("[WebConsole] Received signal from " + conn.getRemoteSocketAddress() + ": " + message);

		// Get command and params
		String wsCommand = message.split(" ")[0];
		String wsCommandParams = "";
		if (message.contains(" "))
			wsCommandParams = message.split(" ", 2)[1];

		// Run command
		WSCommand cmd = commands.get(wsCommand);

		if (cmd == null) {
			Bukkit.getLogger().info(
					"[WebConsole] Signal was not processed since is not valid. Is your plugin/web interface up to date?");
		} else if (!LoginManager.getInstance().isLoggedIn(conn.getRemoteSocketAddress().getAddress().toString())
				&& !wsCommand.equals("LOGIN")) {
			// DO NOTHING. User is not authorised
			conn.send("403 Forbidden");
			Bukkit.getLogger().warning("[WebConsole] " + conn.getRemoteSocketAddress()
					+ " tried to run a command while not authenticated!");
		} else {
			cmd.execute(this, conn, wsCommandParams);
		}
	}

	@Override
	public void onClose(WebSocket conn, int code, String reason, boolean remote) {
		LoginManager.getInstance().logOut(conn.getRemoteSocketAddress().getAddress().toString());
		Bukkit.getLogger()
				.info("[WebConsole] Closed WS connection " + conn.getRemoteSocketAddress() + ". Reason: " + reason);
	}

	@Override
	public void onError(WebSocket conn, Exception ex) {
		Bukkit.getLogger()
				.warning("[WebConsole] Error occured on connection " + conn.getRemoteSocketAddress() + ":" + ex);
	}

	@Override
	public void onStart() {
		Bukkit.getLogger().info("[WebConsole] WebSockets Server started successfully");
	}

	/**
	 * Sends the message to all connected AND logged-in users
	 */
	public void onNewConsoleLinePrinted(String line) {
		Collection<WebSocket> connections = getConnections();
		for (WebSocket connection : connections) {
			if (LoginManager.getInstance().isLoggedIn(connection.getRemoteSocketAddress().getAddress().toString()))
				connection.send("LOG " + line);
		}
	}

	/**
	 * Returns main class
	 * 
	 * @return
	 */
	public WebConsole getMainClass() {
		return plugin;
	}

}