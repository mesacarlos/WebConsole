package es.mesacarlos.webconsole;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.net.InetSocketAddress;
import java.security.KeyStore;

import javax.net.ssl.KeyManagerFactory;
import javax.net.ssl.SSLContext;
import javax.net.ssl.TrustManagerFactory;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.core.Filter;
import org.bukkit.Bukkit;
import org.bukkit.configuration.file.FileConfiguration;
import org.bukkit.plugin.java.JavaPlugin;
import org.java_websocket.server.DefaultSSLWebSocketServerFactory;

import es.mesacarlos.webconsole.minecraft.WebConsoleCommand;
import es.mesacarlos.webconsole.util.Internationalization;
import es.mesacarlos.webconsole.util.LogFilter;
import es.mesacarlos.webconsole.websocket.WSServer;

public class WebConsole extends JavaPlugin {
	FileConfiguration config = this.getConfig();

	// Websocket server and thread
	private WSServer server;
	private Thread wsThread;

	@Override
	public void onEnable() {
		createConfig();
		
		//Change language to user-specified language.
		Internationalization.setCurrentLocale(config.getString("language"));
		
		//Start WebSocket Server
		try {
			startWS();
		} catch (Exception e) {
			Bukkit.getLogger().warning(Internationalization.getPhrase("boot-error"));
			e.printStackTrace();
		}
		
		//This filter is used to read the whole console.
		Filter f = new LogFilter(getWSServer());
		((org.apache.logging.log4j.core.Logger) LogManager.getRootLogger()).addFilter(f);
		
		//Register /WebConsole command
		getCommand("WebConsole").setExecutor(new WebConsoleCommand(this.getDescription().getVersion()));
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
		// SSL variables
		config.addDefault("useSSL", false);
		config.addDefault("StoreType", "JKS");
		config.addDefault("KeyStore", "plugins/WebConsole/keystore.jks");
		config.addDefault("StorePassword", "storepassword");
		config.addDefault("KeyPassword", "keypassword");
		
		// Connection config variables
		config.addDefault("host", "localhost");
		config.addDefault("port", 8080);
		config.addDefault("password", 1234);
		
		// Language config
		config.addDefault("language", "en");

		config.options().copyDefaults(true);
		saveConfig();
	}

	/**
	 * Start WebSocket server
	 */
	private void startWS() throws Exception {
		// Create WebSocket server
		server = new WSServer(this, new InetSocketAddress(config.getString("host"), config.getInt("port")));
		
		if(config.getBoolean("useSSL")) {
			// Configure SSL
			String STORETYPE = config.getString("StoreType");
			String KEYSTORE = config.getString("KeyStore");
			String STOREPASSWORD = config.getString("StorePassword");
			String KEYPASSWORD = config.getString("KeyPassword");
			
			KeyStore ks = KeyStore.getInstance(STORETYPE);
			File kf = new File(KEYSTORE);
			ks.load(new FileInputStream(kf), STOREPASSWORD.toCharArray());
			
			KeyManagerFactory kmf = KeyManagerFactory.getInstance("SunX509");
			kmf.init(ks, KEYPASSWORD.toCharArray());
			TrustManagerFactory tmf = TrustManagerFactory.getInstance("SunX509");
			tmf.init(ks);
			
			SSLContext sslContext = null;
			sslContext = SSLContext.getInstance("TLS");
			sslContext.init(kmf.getKeyManagers(), tmf.getTrustManagers(), null);
			
			server.setWebSocketFactory(new DefaultSSLWebSocketServerFactory(sslContext));
		}

		// Start Server
		wsThread = new Thread(new Runnable() {
			@Override
			public void run() {
				server.run();
			}
		});
		wsThread.start();
	}

	public WSServer getWSServer() {
		return (WSServer) server;
	}
}