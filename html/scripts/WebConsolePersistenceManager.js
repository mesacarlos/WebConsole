/**
 WebConsole Persistence Manager for WebConsole v1.0.0
 Used to save your servers into your browser
 https://github.com/mesacarlos
 2019 Carlos Mesa under MIT License.
*/
class WebConsolePersistenceManager{
	
	/**
	* Saves server into WebStorage
	*/
	saveServer(serverName, serverURI, serverPassword){
		this.createListIfUndefined();
		
		//Create anonymous object
		var server = new Object();
		server.serverName = serverName;
		server.serverURI = serverURI;
		server.serverPassword = serverPassword;
		
		//Save to WebStorage
		var servers = this.getAllServers();
		servers.push(server);
		this.replaceAllServers(servers);
	}
	
	/**
	* Delete server from saved servers
	*/
	deleteServer(serverName){
		this.createListIfUndefined();
		
		//Find server
		var index = -1;
		var servers = this.getAllServers();
		for (i = 0; i < servers.length; i++) { 
			if(servers[i].serverName == serverName){
				index = i;
			}
		}
		
		//Delete it
		if(index > -1){
			servers.splice(index, 1);
		}
		
		//Save to WebStorage
		this.replaceAllServers(servers);
	}
	
	/**
	* Get server details as object
	*/
	getServer(serverName){
		this.createListIfUndefined();
		
		var servers = this.getAllServers();
		for (i = 0; i < servers.length; i++) { 
			if(servers[i].serverName == serverName){
				return servers[i];
			}
		}
	}
	
	/**
	* Get all servers
	*/
	getAllServers(){
		this.createListIfUndefined();
		return JSON.parse(window.localStorage.servers);
	}
	
	/**
	* Create server list if not defined
	*/
	createListIfUndefined(){
		if (typeof window.localStorage.servers === 'undefined') {
			window.localStorage.servers = JSON.stringify(new Array());
		}
	}
	
	/**
	* Replaces all server list with provided list
	*/
	replaceAllServers(newServerList){
		window.localStorage.servers = JSON.stringify(newServerList);
	}
	
}