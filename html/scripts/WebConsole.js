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
var autoPasswordCompleted = false; //When true, saved password was used. If a 401 is received, then saved password is not correct

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
* Server password typed (modal 'done' button clicked)
*/
$("#passwordSendButton").click(function() {
	//Close modal
	$('#passwordModal').modal('hide');
});

/**
* Enter button keyboard pressed on password modal
*/
$("#passwordForm").submit(function(event){
	//Solves bug with forms:
	event.preventDefault();
	
	//Close modal
	$('#passwordModal').modal('hide');
});

$('#passwordModal').on('hidden.bs.modal', function (e) {
	//Send LOGIN command to server
	var pwd = $("#server-pwd").val();
	connectionManager.sendPassword(pwd);
	
	//Save password if set
	var savePasswordChecked = $("#rememberPwdCheckbox").prop("checked");
	if(savePasswordChecked){
		var serverName = connectionManager.activeConnection.serverName;
		var serverURI = connectionManager.activeConnection.serverURI;
		var svObj = new WSServer(serverName, serverURI);
		svObj.setPassword(pwd);
		persistenceManager.saveServer(svObj);
	}
	
	//Remove password from modal
	$("#server-pwd").val('');
});




/**
* Prepare and show server to user
*/
function openServer(serverName){
	//Hide welcome div if user is in welcome page
	$("#welcomeContainer").hide();
	$("#serverContainer").show();
	
	//Change server name and related info
	$("#serverTitle").text(serverName);
	$("#consoleTextArea").text("");
	
	//New server, new variables:
	autoPasswordCompleted = false;
	
	//Create or retrieve connection
	connectionManager.loadConnection(serverName);
	
	//Load saved messages
	var i;
	var messages = connectionManager.activeConnection.messages;
	for(i = 0; i < messages.length; i++){
		if(messages[i].status != 401){
			onWebSocketsMessage(messages[i]);
		}
	}
	
	//Subscribe a function
	connectionManager.activeConnection.subscribe(onWebSocketsMessage);
}

function onWebSocketsMessage(message){
	switch (message.status) {
		case 10:
			//Console Output
			writeToWebConsole(message.message);
			break;
		case 200:
			//Processed
			writeToWebConsole(message.message);
			break;
		case 400:
			//Unknown Command
			writeToWebConsole(message.message);
			break;
		case 401:
			//Waiting for login. Show password modal or retrieve password
			var savedPwd = persistenceManager.getServer(connectionManager.activeConnection.serverName).serverPassword;
			if(typeof savedPwd !== "undefined" && !autoPasswordCompleted){
				connectionManager.sendPassword(savedPwd);
				autoPasswordCompleted = true;
			}else{
				$('#passwordModal').modal('show');
			}
			break;
		default:
			console.log('Unknown server response:');
	}
	console.log(message);
}

/**
* Write to console
*/
function writeToWebConsole(msg){
	$("#consoleTextArea").append(msg + "\n");
}

/**
* On send command button click
*/
$("#sendCommandButton").click(function() {
	connectionManager.sendConsoleCmd($('#commandInput').val());
	$('#commandInput').val('');
});

/**
* Called from WebConsoleConnector only.
*/
function closedConnection(serverName){
	if(connectionManager.activeConnection.serverName == serverName){
		//Disable GUI, back to welcome page
		$("#welcomeContainer").show();
		$("#serverContainer").hide();
		
		//Inform user
		$('#disconnectionModal').modal('show');
	}
	connectionManager.deleteConnection(serverName);
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
		$('#ServerListDropDown').append('<a class="dropdown-item servermenuitem" href="#" onclick="openServer(\'' + servers[i].serverName + '\')">' + servers[i].serverName + '</a>');
	}
	
	//Show a "no servers" message when no servers are added
	if(servers.length == 0){
		$('#ServerListDropDown').append('<a class="dropdown-item servermenuitem disabled" href="#">No Servers added</a>');
	}
}