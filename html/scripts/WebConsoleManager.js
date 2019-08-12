/**
 WebConsole Manager for WebConsole v1.0.0
 Used to manage active connections
 https://github.com/mesacarlos
 2019 Carlos Mesa under MIT License.
*/
class WebConsoleManager {
	constructor(){
		this.activeConnections = []; //Active Connectors list
	}
	
	/**
	* Adds connection to list
	*/
	addConnection(connection){
		this.activeConnections.push(connection);
	}
	
	/**
	* Retrieve server by name
	*/
	getConnection(serverName){
		var i;
		for (i = 0; i < this.activeConnections.length; i++) { 
			if(this.activeConnections[i].serverName == serverName){
				return this.activeConnections[i];
			}
		}
	}
	
}