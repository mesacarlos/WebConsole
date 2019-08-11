package com.mesacarlos.webconsole.command;

import java.util.HashMap;

public class CommandFactory {

	public static HashMap<String, WSCommand> getCommandsHashMap() {
		HashMap<String, WSCommand> commands = new HashMap<String, WSCommand>();
		commands.put("LOGIN", new LogInCommand());
		commands.put("EXEC", new ExecuteCmdCommand());
		return commands;
	}
}