/**
 WebConsole Persistence Manager for WebConsole
 Used to save your servers into your browser
 https://github.com/mesacarlos
 2019 Carlos Mesa under MIT License.
*/
class WebConsolePersistenceManager{
	
	/**
	* Saves or updates server into WebStorage
	*/
	saveServer(serverObject){
		this.initializeLocalStorage();
		
		//Check if server exists
		var i;
		var found = false;
		var servers = this.getAllServers();
		for (i = 0; i < servers.length; i++) { 
			if(servers[i].serverName == serverObject.serverName){
				//Exists, replacing it
				servers[i] = serverObject;
				found = true;
			}
		}
		
		//Not found, adding it
		if(found == false){
			servers.push(serverObject);
		}
		
		this.replaceAllServers(servers);
	}
	
	/**
	* Delete server from saved servers
	*/
	deleteServer(serverName){
		this.initializeLocalStorage();
		
		//Find server
		var i;
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
		this.initializeLocalStorage();
		
		var i;
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
		this.initializeLocalStorage();
		
		var storageObj = JSON.parse(window.localStorage.WebConsole);
		return storageObj.servers;
	}

	/**
	 * Save language for this client
	 */
	setLanguage(lang){
		this.initializeLocalStorage();

		//Retrieve saved data
		var storageObj = JSON.parse(window.localStorage.WebConsole);
		storageObj.language = lang;
		
		//Save to WebStorage
		window.localStorage.WebConsole = JSON.stringify(storageObj);
	}

	/**
	 * Get saved language for this client
	 */
	getLanguage(){
		this.initializeLocalStorage();
		
		var storageObj = JSON.parse(window.localStorage.WebConsole);
		if(!storageObj.language)
			return "en_US";
		return storageObj.language;
	}
	
	/**
	* Create server list if not defined
	*/
	initializeLocalStorage(){
		if (typeof window.localStorage.WebConsole === 'undefined') {
			//Create empty object
			var storageObj = new Object();
			storageObj.servers = new Array();
			storageObj.language = "en_US";
			
			//Save to WebStorage
			window.localStorage.WebConsole = JSON.stringify(storageObj);
		}
	}
	
	/**
	* Replaces all server list with provided list
	*/
	replaceAllServers(newServerList){
		//Retrieve saved data
		var storageObj = JSON.parse(window.localStorage.WebConsole);
		storageObj.servers = newServerList;
		
		//Save to WebStorage
		window.localStorage.WebConsole = JSON.stringify(storageObj);
	}
	
}

class WSServer{
	constructor(serverName, serverURI){
		this.serverName = serverName;
		this.serverURI = serverURI;
	}
	
	setPassword(pwd){
		this.serverPassword = pwd;
	}
}