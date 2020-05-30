package es.mesacarlos.webconsole.websocket.command;

import java.util.concurrent.ExecutionException;

import org.bukkit.Bukkit;
import org.bukkit.command.ConsoleCommandSender;
import org.java_websocket.WebSocket;

import es.mesacarlos.webconsole.util.Internationalization;
import es.mesacarlos.webconsole.websocket.WSServer;

public class ExecCommand implements WSCommand {

	@Override
	public void execute(WSServer wsServer, WebSocket conn, String command) {

		Bukkit.getLogger().info(Internationalization.getPhrase("cmd-executed-console", conn.getRemoteSocketAddress(), Internationalization.utf8ToIso(command)));
		ConsoleCommandSender sender = Bukkit.getServer().getConsoleSender();

		try {
			@SuppressWarnings("unused")
			boolean success = Bukkit.getScheduler()
					.callSyncMethod(wsServer.getMainClass(), () -> Bukkit.dispatchCommand(sender, command)).get();
		} catch (InterruptedException | ExecutionException e) {
			e.printStackTrace();
		}

	}

}