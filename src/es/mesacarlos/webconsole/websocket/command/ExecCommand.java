package es.mesacarlos.webconsole.websocket.command;

import java.util.concurrent.ExecutionException;

import org.bukkit.Bukkit;
import org.bukkit.command.ConsoleCommandSender;
import org.java_websocket.WebSocket;

import es.mesacarlos.webconsole.WebConsole;
import es.mesacarlos.webconsole.auth.LoginManager;
import es.mesacarlos.webconsole.auth.ConnectedUser;
import es.mesacarlos.webconsole.config.UserType;
import es.mesacarlos.webconsole.util.Internationalization;
import es.mesacarlos.webconsole.websocket.WSServer;

public class ExecCommand implements WSCommand {

	@Override
	public void execute(WSServer wsServer, WebSocket conn, String command) {
		ConnectedUser u = LoginManager.getInstance().getUser(conn.getRemoteSocketAddress());
		if(u == null || u.getUserType() != UserType.ADMIN) {
			if(u != null)
				Bukkit.getLogger().warning(Internationalization.getPhrase("viewer-error-console", u, command));
			return;
		}
		
		Bukkit.getLogger().info(Internationalization.getPhrase("cmd-executed-console", conn.getRemoteSocketAddress(), Internationalization.utf8ToIso(command)));
		ConsoleCommandSender sender = Bukkit.getServer().getConsoleSender();
		WebConsole plugin = (WebConsole) Bukkit.getPluginManager().getPlugin("WebConsole");
		try {
			@SuppressWarnings("unused")
			boolean success = Bukkit.getScheduler()
					.callSyncMethod(plugin, () -> Bukkit.dispatchCommand(sender, command)).get();
		} catch (InterruptedException | ExecutionException e) {
			e.printStackTrace();
		}

	}

}