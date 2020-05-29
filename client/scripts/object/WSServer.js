class WSServer{
	constructor(serverName, serverURI){
		this.serverName = serverName;
		this.serverURI = serverURI;
	}
	
	setPassword(pwd){
		this.serverPassword = pwd;
	}
}