package es.mesacarlos.webconsole.websocket.command;

import java.util.HashMap;

public class WSCommandFactory {

	public static HashMap<String, WSCommand> getCommandsHashMap() {
		HashMap<String, WSCommand> commands = new HashMap<String, WSCommand>();
		commands.put("LOGIN", new LogInCommand());
		commands.put("EXEC", new ExecCommand());
		commands.put("PLAYERS", new PlayersCommand());
		commands.put("CPUUSAGE", new CpuUsageCommand());
		commands.put("RAMUSAGE", new RamUsageCommand());
		commands.put("TPS", new TpsCommand());
		commands.put("READLOGFILE", new ReadLogFileCommand());
		return commands;
	}
}