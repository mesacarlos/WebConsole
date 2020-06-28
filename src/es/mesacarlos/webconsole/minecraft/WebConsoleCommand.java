package es.mesacarlos.webconsole.minecraft;

import java.util.ArrayList;

import org.bukkit.command.Command;
import org.bukkit.command.CommandExecutor;
import org.bukkit.command.CommandSender;

import es.mesacarlos.webconsole.auth.LoginManager;
import es.mesacarlos.webconsole.auth.ConnectedUser;
import es.mesacarlos.webconsole.util.Internationalization;

public class WebConsoleCommand implements CommandExecutor {
	private String version;

	public WebConsoleCommand(String version) {
		this.version = version;
	}

	@Override
	public boolean onCommand(CommandSender sender, Command command, String label, String[] args) {
		StringBuilder msg = new StringBuilder();

		msg.append(Internationalization.getPhrase("webconsole-version", version) + "\n");
		ArrayList<ConnectedUser> users = LoginManager.getInstance().getLoggedInUsers();
		
		if (users.isEmpty()) {
			msg.append(Internationalization.getPhrase("webconsole-no-connections"));
		} else {
			msg.append(Internationalization.getPhrase("webconsole-active-connections") + "\n");
			for (int i = 0; i < users.size(); i++) {
				ConnectedUser user = users.get(i);
				msg.append(user.toString());
				if(i+1 < users.size())
					msg.append("\n");
			}
		}

		sender.sendMessage(msg.toString());
		return true;
	}

}