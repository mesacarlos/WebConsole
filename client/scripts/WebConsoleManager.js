/**
 WebConsole Manager for WebConsole
 Used to manage active connections
 https://github.com/mesacarlos
 2019-2020 Carlos Mesa under MIT License.
*/
class WebConsoleManager {
	constructor(){
		this.activeConnections = []; //Active Connectors list
	}
	
	/**
	* Loads a existing connection or creates a new one
	*/
	loadConnection(serverName){
		//If a connection is already active, delete all subscribers
		if(this.activeConnection){
			this.activeConnection.removeSubscribers();
		}
		
		//If connection exists, load it
		var manager = this;
		var i;
		for (i = 0; i < this.activeConnections.length; i++) { 
			if(this.activeConnections[i].serverName == serverName){
				manager.activeConnection = this.activeConnections[i];
				return;
			}
		}
		
		//If not created yet, create it
		var serverObj = new WebConsolePersistenceManager().getServer(serverName);
		this.activeConnection = new WebConsoleConnector(serverObj.serverName, serverObj.serverURI);
		this.activeConnection.connect();
		
		//Save to connections list
		this.activeConnections.push(this.activeConnection);
	}
	
	/**
	* Deletes connection (for example, if a connection was closed by server).
	* Called by WebConsole.js
	*/
	deleteConnection(serverName, deleteFromArrayOnly){
		//Delete from active connection (if it is the active one)
		if(!deleteFromArrayOnly && this.activeConnection.serverName == serverName){
			this.activeConnection = null;
		}
		
		//Delete from array
		var i;
		for (i = 0; i < this.activeConnections.length; i++) { 
			if(this.activeConnections[i].serverName == serverName){
				this.activeConnections.splice(i, 1);
			}
		}
	}
	
	/**
	* Send password to server
	*/
	sendPassword(pwd){
		this.activeConnection.sendToServer("LOGIN " + pwd);
	}
	
	/**
	* Send console command to server
	*/
	sendConsoleCmd(cmd){
		this.activeConnection.sendToServer("EXEC " + cmd);
		this.activeConnection.commands.push(cmd);
	}
	
	/**
	* Asks server for CPU, RAM and players info
	*/
	askForInfo(){
		this.activeConnection.sendToServer("PLAYERS");
		this.activeConnection.sendToServer("CPUUSAGE");
		this.activeConnection.sendToServer("RAMUSAGE");
	}

	/**
	* Asks server for full latest.log
	*/
	askForLogs(){
		this.activeConnection.sendToServer("READLOGFILE");
	}
	
}