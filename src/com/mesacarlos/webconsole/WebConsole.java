package com.mesacarlos.webconsole;

import java.io.IOException;
import java.net.InetSocketAddress;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.core.Filter;
import org.bukkit.configuration.file.FileConfiguration;
import org.bukkit.plugin.java.JavaPlugin;

import com.mesacarlos.webconsole.util.LogFilter;
import com.mesacarlos.webconsole.websockets.WSServer;

public class WebConsole extends JavaPlugin {
	FileConfiguration config = this.getConfig();
	
	// Websocket server and thread
	private WSServer server;
	private Thread wsThread;
	
	@Override
	public void onEnable() {
		createConfig();
		startWS();
		
		Filter f = new LogFilter(getWSServer());
		((org.apache.logging.log4j.core.Logger) LogManager.getRootLogger()).addFilter(f);
	}
	
	@Override
	public void onDisable() {
		try {
			server.stop();
			wsThread = null;
		} catch (IOException | InterruptedException e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * Creates configuration file
	 */
	private void createConfig() {
		config.addDefault("host", "localhost");
		config.addDefault("port", 8080);
		config.addDefault("password", 1234);
		config.options().copyDefaults(true);
		saveConfig();
	}
	
	/**
	 * Start WebSockets server
	 */
	private void startWS() {
		//Start WebSockets server
		server = new WSServer(this, new InetSocketAddress(config.getString("host"), config.getInt("port")));
		wsThread = new Thread(new Runnable() {
			@Override
			public void run() {
				server.run();
			}
		});
		wsThread.start();
	}
	
	public WSServer getWSServer() {
		return (WSServer)server;
	}
}