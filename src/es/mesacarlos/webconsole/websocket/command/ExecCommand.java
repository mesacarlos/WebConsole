package es.mesacarlos.webconsole.websocket.command;

import java.util.concurrent.ExecutionException;

import es.mesacarlos.webconsole.config.ConfigManager;
import es.mesacarlos.webconsole.config.UserData;
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
	LoginManager loginManager = LoginManager.getInstance();

	@Override
	public void execute(WSServer wsServer, WebSocket conn, String command) {
		ConnectedUser u = LoginManager.getInstance().getUser(conn.getRemoteSocketAddress());
		if(u == null || u.getUserType() != UserType.ADMIN) {
			if(u != null)
				Bukkit.getLogger().warning(Internationalization.getPhrase("no-send-permission-console", u, command));
			return;
		}

		boolean allowCommand = false;

		for(UserData ud : ConfigManager.getInstance().getAllUsers()) {
			if (ud.getUsername().equals(loginManager.getUser(conn.getRemoteSocketAddress()).getUsername())) {

				if (!ud.isWhitelistEnabled()) { //Skip whitelist check.
					allowCommand = true;
					break;
				}

				String[] splitCommand = command.split(" ");

				for (String whitelistedCommand : ud.getWhitelistedCommands()) {
					String[] splitWhitelistedCommand = whitelistedCommand.split(" ");

					for (int x = 0; x < splitWhitelistedCommand.length; x ++) {

						if (!ud.isWhitelistActsAsBlacklist()) {

							if (splitCommand[x].equalsIgnoreCase(splitWhitelistedCommand[x])) { //cmd is whitelisted.
								allowCommand = true;
								continue;
							}

							allowCommand = false;
							break;
						}
					}
				}

				if (!allowCommand //Check if was detected by whitelist
						&& ud.isWhitelistActsAsBlacklist()) allowCommand = true; //cmd is not blacklisted.

				break;
			}
		}

		if (!allowCommand) {
			Bukkit.getLogger().warning(Internationalization.getPhrase("no-send-permission-console", u, command));
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