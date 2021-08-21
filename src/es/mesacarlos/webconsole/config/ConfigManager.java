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
		
		//Create passwords section if it does not exist
		ConfigurationSection passwordsSection = config.getConfigurationSection("passwords");
		if(passwordsSection == null) {
			passwordsSection = config.createSection("passwords");
		}
		
		//Create passwords.admin section if it does not exist
		ConfigurationSection adminPasswordSection = passwordsSection.getConfigurationSection("admin");
		if(adminPasswordSection == null) {
			adminPasswordSection = passwordsSection.createSection("admin");
			adminPasswordSection.createSection("user1");
		}
		
		//For each admin user, create the password value and the commandWhitelist section if it does not exist
		Set<String> adminUsersSections = adminPasswordSection.getKeys(false);
		for (String adminUserSectionName : adminUsersSections) {
			ConfigurationSection userSection = adminPasswordSection.getConfigurationSection(adminUserSectionName);
			if(userSection == null) {
				//If userSection is null, that means that the config file is prior to v2.2. We need to update the file to v2.2 by replacing the "user:password" value to a new section for each user.
				String userPasswordFromOldConfig = adminPasswordSection.getString(adminUserSectionName);
				userSection = adminPasswordSection.createSection(adminUserSectionName);
				userSection.set("password", userPasswordFromOldConfig);
			}
			userSection.addDefault("password", "mySecurePassword");
			
			ConfigurationSection commandWhitelist = userSection.getConfigurationSection("commandWhitelist");
			if(commandWhitelist == null) {
				commandWhitelist = userSection.createSection("commandWhitelist");
				commandWhitelist.addDefault("enabled", false);
				commandWhitelist.addDefault("commandWhitelistActsAsBlacklist", false);
				commandWhitelist.addDefault("whitelist", Arrays.asList("whisper", "gamemode survival"));
			}
		}
		
		//Create passwords.viewer section if it does not exist
		ConfigurationSection viewerPasswordSection = passwordsSection.getConfigurationSection("viewer");
		if(viewerPasswordSection == null) {
			viewerPasswordSection = passwordsSection.createSection("viewer");
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