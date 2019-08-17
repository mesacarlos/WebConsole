/**
 Main JS file for WebConsole.
 https://github.com/mesacarlos
 2019 Carlos Mesa under MIT License.
*/

/**
* Global variables
*/
var persistenceManager = new WebConsolePersistenceManager();
var connectionManager = new WebConsoleManager();
var autoPasswordCompleted = false; //When true, saved password was used. If a 401 is received, then saved password is not correct
var statusCommandsInterval = -1;

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
		case 1000:
			//Players
			writePlayerInfo(message.connectedPlayers, message.maxPlayers);
			break;
		case 1001:
			//Cpu Usage
			writeCpuInfo(message.usage);
			break;
		case 1002:
			//RAM Usage
			writeRamInfo(message.free, message.used, message.max);
			break;
		default:
			console.log('Unknown server response:');
	}
	console.log(message);
	
	//Add interval for Players, CPU and RAM info, if not set
	if(statusCommandsInterval == -1 && message.status !== 401){
		statusCommandsInterval = setInterval(function(){
			connectionManager.askForInfo();
		}, 2500);
	}
}

/**
* Write to console
*/
function writeToWebConsole(msg){
	var isScrolledDown = document.getElementById("consoleTextArea").scrollHeight - document.getElementById("consoleTextArea").scrollTop - 12 == $("#consoleTextArea").height();
	
	$("#consoleTextArea").append(msg.replace("<", "&lt;") + "\n");
	
	if(isScrolledDown){
		var textarea = document.getElementById('consoleTextArea');
		textarea.scrollTop = textarea.scrollHeight;
	}
}

/**
* Fill connected players card
*/
function writePlayerInfo(connected, maximum){
	$("#connectedPlayers").text(connected);
	$("#maxPlayers").text(maximum);
	
	var percent = (connected/maximum)*100;
	$("#playerProgressBar").width(percent + "%");
}

/**
* Fill CPU info card
*/
function writeCpuInfo(usage){
	$("#cpuInfo").text(usage + "%");
	
	$("#CpuProgressBar").width(usage + "%");
}

/**
* Fill RAM info card
*/
function writeRamInfo(free, used, total){
	$("#usedRam").text(used);
	$("#totalRam").text(total);
	
	var percent = (used/total)*100;
	$("#RamProgressBar").width(percent + "%");
}

/**
* Called from WebConsoleConnector only.
*/
function closedConnection(serverName){
	if(connectionManager.activeConnection.serverName == serverName){
		backToHomepage();
		
		//Inform user
		$('#disconnectionModal').modal('show');
	}
	connectionManager.deleteConnection(serverName);
}

/**
* Shows welcome screen
*/
function backToHomepage(){
	//Stop gathering info from server
	clearInterval(statusCommandsInterval);
	statusCommandsInterval = -1;
	
	//Clear all server indicators
	writePlayerInfo(0, 0);
	writeCpuInfo(0);
	writeRamInfo(0, 0, 0);
	
	$("#welcomeContainer").show();
	$("#serverContainer").hide();
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