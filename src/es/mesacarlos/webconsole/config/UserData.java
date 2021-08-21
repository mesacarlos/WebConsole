package es.mesacarlos.webconsole.config;

import java.util.List;

public class UserData {
	private String username;
	private String password;
	private UserType userType;
	private boolean isWhitelistEnabled;
	private boolean isWhitelistActsAsBlacklist;
	private List<String> whitelistedCommands;
	
	public UserData(String username, String password, UserType userType,
					boolean isWhitelistEnabled, boolean isWhitelistActsAsBlacklist, List<String> whitelistedCommands) {
		this.username = username;
		this.password = password;
		this.userType = userType;
		this.isWhitelistEnabled = isWhitelistEnabled;
		this.isWhitelistActsAsBlacklist = isWhitelistActsAsBlacklist;
		this.whitelistedCommands = whitelistedCommands;
	}

	public String getUsername() {
		return username;
	}
	
	public String getPassword() {
		return password;
	}
	
	public UserType getUserType() {
		return userType;
	}

	public boolean isWhitelistEnabled() {
		return isWhitelistEnabled;
	}

	public boolean isWhitelistActsAsBlacklist() {
		return isWhitelistActsAsBlacklist;
	}

	public List<String> getWhitelistedCommands() {
		return whitelistedCommands;
	}
}