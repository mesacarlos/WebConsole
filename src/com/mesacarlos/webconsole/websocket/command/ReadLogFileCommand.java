package com.mesacarlos.webconsole.websocket.command;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;

import org.bukkit.Bukkit;
import org.java_websocket.WebSocket;

import com.mesacarlos.webconsole.util.Internationalization;
import com.mesacarlos.webconsole.websocket.WSServer;
import com.mesacarlos.webconsole.websocket.response.ConsoleOutput;

public class ReadLogFileCommand implements WSCommand{

	@Override
	public void execute(WSServer wsServer, WebSocket conn, String params) {
		String log = null;
		try {
			 log = new String(Files.readAllBytes(Paths.get("logs/latest.log")), StandardCharsets.UTF_8);
			 List<Character> newLineChars = Arrays.asList('\n', '\r');
			 
			 while(newLineChars.contains(log.charAt(log.length()-1)))
				 log = log.substring(0, log.length() - 1);
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		if(log == null) {
			Bukkit.getLogger().info(Internationalization.getPhrase("log-read-error"));
			return;
		}
		
		wsServer.sendToClient(conn,
			new ConsoleOutput(log)
		);
	}

}