package com.mesacarlos.webconsole.minecraft;

import java.net.InetSocketAddress;
import java.util.ArrayList;

import org.bukkit.command.Command;
import org.bukkit.command.CommandExecutor;
import org.bukkit.command.CommandSender;

import com.mesacarlos.webconsole.util.Internationalization;
import com.mesacarlos.webconsole.util.LoginManager;

public class WebConsoleCommand implements CommandExecutor {
	private String version;

	public WebConsoleCommand(String version) {
		this.version = version;
	}

	@Override
	public boolean onCommand(CommandSender sender, Command command, String label, String[] args) {
		StringBuilder msg = new StringBuilder();

		msg.append(Internationalization.getPhrase("webconsole-version", version) + ".\n");
		ArrayList<InetSocketAddress> connections = LoginManager.getInstance().getLoggedInUsers();
		
		if (connections.isEmpty()) {
			msg.append(Internationalization.getPhrase("webconsole-no-connections"));
		} else {
			msg.append(Internationalization.getPhrase("webconsole-active-connections") + "\n");
			for (int i = 0; i < connections.size(); i++) {
				InetSocketAddress connection = connections.get(i);
				msg.append(connection.toString());
				if(i+1 < connections.size())
					msg.append("\n");
			}
		}

		sender.sendMessage(msg.toString());
		return true;
	}

}