/**
 Main JS file for WebConsole.
 Version v1.0.0
 https://github.com/mesacarlos
 2019 Carlos Mesa under MIT License.
*/

/**
* Global variables
*/
var persistenceManager = new WebConsolePersistenceManager();
var connectionManager = new WebConsoleManager();

/**
* Show saved serverlist on startup
*/
$(document).ready(function() {
	$("#serverContainer").hide();
	updateServerList();
});

/**
* Server saver button click handler
*/
$("#saveAndConnectServerButton").click(function() {
	//Save server
	var name = $("#server-name").val();
	var uri = $("#server-uri").val();
	persistenceManager.saveServer(new WSServer(name, uri));
	
	//Empty all modal values
	$("#server-name").val("");
	$("#server-uri").val("");
	
	//Update GUI serverlist
	updateServerList();
	
	//Connect to server
	openServer(name);
});

/**
* Server saver button click handler
*/
$("#passwordTypedButton").click(function() {
	//Send LOGIN command to server
	
});

/**
* Prepare and show server to user
*/
function openServer(serverName){
	//Hide welcome div if user is in welcome page
	$("#welcomeContainer").hide();
	$("#serverContainer").show();
	
	//If a connection is already active, delete all subscribers
	if(typeof connectionManager.activeConnection  !== "undefined"){
		connectionManager.activeConnection.removeSubscribers();
	}
	
	//Start connection or retrieve it if already exists
	if(typeof connectionManager.getConnection(serverName)  === "undefined"){
		//Retrieve from persistence
		var serverObj = persistenceManager.getServer(serverName);
		connectionManager.activeConnection = new WebConsoleConnector(serverObj.serverName, serverObj.serverURI);
	}else{
		//Use active connection
		connectionManager.activeConnection = connectionManager.getConnection(serverName);
		
	}
	
	//Subscribe a function and connect
	connectionManager.activeConnection.subscribe(onWebSocketsMessage);
	connectionManager.activeConnection.connect();
}

function onWebSocketsMessage(message){
	switch (message.status) {
		case 10:
			//Console Output
			
			break;
		case 200:
			//Processed
			
			break;
		case 400:
			//Unknown Command
			
			break;
		case 401:
			//Waiting for login
			
			break;
		case 403:
			//Forbidden
			
			break;
		default:
			console.log('Unknown server response:');
			console.log(message);
	}
	console.log(message);
}

/**
* Update dropdown with saved server list
*/
function updateServerList(){
	//Delete all servers in dropdown
	$('.servermenuitem').remove();
	
	//Add all servers
	var servers = persistenceManager.getAllServers();
	for(var i = 0; i < servers.length; i++){
		$('#ServerListDropDown').append('<a class="dropdown-item servermenuitem" href="#" onclick=openServer("' + servers[i].serverName + '")>' + servers[i].serverName + '</a>');
	}
	
	//Show a "no servers" message when no servers are added
	if(servers.length == 0){
		$('#ServerListDropDown').append('<a class="dropdown-item servermenuitem disabled" href="#">No Servers added</a>');
	}
}