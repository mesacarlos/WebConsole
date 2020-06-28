package es.mesacarlos.webconsole.config;

public class UserData {
	private String username;
	private String password;
	private UserType userType;
	
	public UserData(String username, String password, UserType userType) {
		this.username = username;
		this.password = password;
		this.userType = userType;
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
}