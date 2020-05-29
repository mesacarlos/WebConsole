package es.mesacarlos.webconsole.websocket.command;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

import org.bukkit.Bukkit;
import org.java_websocket.WebSocket;

import es.mesacarlos.webconsole.util.Internationalization;
import es.mesacarlos.webconsole.websocket.WSServer;
import es.mesacarlos.webconsole.websocket.response.ConsoleOutput;

public class ReadLogFileCommand implements WSCommand{

	@Override
	public void execute(WSServer wsServer, WebSocket conn, String params) {
		List<String> lines = null;
		try {
			 lines = Files.readAllLines(Paths.get("logs/latest.log"), StandardCharsets.UTF_8);
		} catch (IOException e) {
			try {
				lines = Files.readAllLines(Paths.get("logs/latest.log"), StandardCharsets.ISO_8859_1);
			}catch(IOException ex) {
				ex.printStackTrace();
			}
			
		}
		
		if(lines == null) {
			Bukkit.getLogger().info(Internationalization.getPhrase("log-read-error"));
			return;
		}
		
		for(String line : lines)
			wsServer.sendToClient(conn, new ConsoleOutput(line, null));
	}

}