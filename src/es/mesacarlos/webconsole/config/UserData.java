package es.mesacarlos.webconsole.config;

public class UserData {
	private String username;
	private String password;
	
	public UserData(String username, String password) {
		this.username = username;
		this.password = password;
	}
	
	public String getUsername() {
		return username;
	}
	
	public String getPassword() {
		return password;
	}
}