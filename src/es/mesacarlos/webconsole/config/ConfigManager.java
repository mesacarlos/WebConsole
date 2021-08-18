package es.mesacarlos.webconsole.config;

import java.net.InetSocketAddress;
import java.util.*;

import org.bukkit.Bukkit;
import org.bukkit.configuration.ConfigurationSection;
import org.bukkit.configuration.file.FileConfiguration;

import es.mesacarlos.webconsole.WebConsole;

public class ConfigManager {
	private static ConfigManager instance;
	private WebConsole plugin = (WebConsole) Bukkit.getPluginManager().getPlugin("WebConsole");
	private FileConfiguration config = plugin.getConfig();
	
	private ConfigManager() {
		loadConfig();
	}
	
	public static ConfigManager getInstance() {
		if(instance == null)
			instance = new ConfigManager();
		return instance;
	}
	
	/**
	 * Create configuration file or load it if already exist
	 */
	private void loadConfig() {
		// SSL variables
		config.addDefault("useSSL", false);
		config.addDefault("StoreType", "JKS");
		config.addDefault("KeyStore", "plugins/WebConsole/keystore.jks");
		config.addDefault("StorePassword", "storepassword");
		config.addDefault("KeyPassword", "keypassword");
		
		// Connection config variables
		config.addDefault("host", "0.0.0.0");
		config.addDefault("port", 8080);
		
		// Language config
		config.addDefault("language", "en");
		
		if(config.getConfigurationSection("passwords") == null) {
			ConfigurationSection passwordsSection = config.createSection("passwords");
			ConfigurationSection adminPasswordSection = passwordsSection.createSection("admin");
			ConfigurationSection individualAdminPasswordSection = adminPasswordSection.createSection("user1");
			individualAdminPasswordSection.addDefault("password", "mySecurePassword");
			ConfigurationSection commandWhitelist = individualAdminPasswordSection.createSection("commandWhitelist");
			commandWhitelist.addDefault("enabled", false);
			commandWhitelist.addDefault("commandWhitelistActsAsBlacklist", false);
			commandWhitelist.addDefault("whitelist", Arrays.asList("whisper", "gamemode survival"));
			passwordsSection.createSection("viewer");
		}
		
		config.options().copyDefaults(true);
		plugin.saveConfig();
	}
	
	public boolean isSslEnabled() {
		return config.getBoolean("useSSL");
	}
	
	public String getStoreType() {
		return config.getString("StoreType");
	}
	
	public String getKeyStore() {
		return config.getString("KeyStore");
	}
	
	public String getStorePassword() {
		return config.getString("StorePassword");
	}
	
	public String getKeyPassword() {
		return config.getString("KeyPassword");
	}
	
	/**
	 * Get host and port fields already as InetSocketAddress
	 * @return InetSocketAddress created from the fields host and port of config.yml
	 */
	public InetSocketAddress getSocketAdress() {
		return new InetSocketAddress(config.getString("host"), config.getInt("port"));
	}
	
	/**
	 * Language code from config.yml
	 * @return language code
	 */
	public String getLanguage() {
		return config.getString("language");
	}
	
	/**
	 * Get all admins as a UserData list
	 * @return list of admin users
	 */
	private List<UserData> getAdmins() {
		Set<String> adminConfig = plugin.getConfig().getConfigurationSection("passwords").getConfigurationSection("admin").getKeys(false);

		List<UserData> adminUsers = new ArrayList<>();
		
		for(String username : adminConfig) {
			adminUsers.add(new UserData(
					username,
					plugin.getConfig().getString("passwords.admin." + username + ".password"),
					UserType.ADMIN,
					plugin.getConfig().getBoolean("passwords.admin." + username + ".commandWhitelist.enabled"),
					plugin.getConfig().getBoolean("passwords.admin." + username + ".commandWhitelist.commandWhitelistActsAsBlacklist"),
					plugin.getConfig().getStringList("passwords.admin." + username + ".commandWhitelist.whitelist")));
		}
		
		return adminUsers;
	}
	
	/**
	 * Get all viewers as a UserData list
	 * @return list of viewer users
	 */
	private List<UserData> getViewers() {
		Map<String, Object> passwords = plugin.getConfig().getConfigurationSection("passwords").getConfigurationSection("viewer").getValues(false);
		List<UserData> viewerUsers = new ArrayList<>();
		
		for(Map.Entry<String, Object> entry : passwords.entrySet())
			viewerUsers.add(new UserData(entry.getKey(), entry.getValue().toString(), UserType.VIEWER, false, false, new ArrayList<>()));
		
		return viewerUsers;
	}
	
	/**
	 * Get all registered users
	 * @return All Admin and Viewer users inside config.yml
	 */
	public List<UserData> getAllUsers(){
		List<UserData> users = getAdmins();
		users.addAll(getViewers());
		return users;
	}
	
}