/**
 JS File containing all JQuery-related handlers
 https://github.com/mesacarlos
 2019-2020 Carlos Mesa under MIT License.
*/

/**
* Show saved serverlist on startup
*/
$(document).ready(function() {
	$("#serverContainer").hide();
	persistenceManager.initializeSettings();
	setLanguage(persistenceManager.getLanguage());
	updateServerList();

	//Check SSL host
	if (location.protocol != 'https:'){
		$("#addServerModalSslAdvice").hide();
	}else{
		$("#server-ssl").prop('checked', true);
		$("#server-ssl").prop("disabled", true);
	}

	//Remove servers from persistence with invalid names. See v1.4-rev2 for details
	var servers = persistenceManager.getAllServers();
	for(var i = 0; i < servers.length; i++){
		if(servers[i].serverName.includes("\'") || servers[i].serverName.includes("\"") || servers[i].serverName.includes("<") || servers[i].serverName.includes(">")){
			persistenceManager.deleteServer(servers[i].serverName);
		}
	}
});

/**
* Add server modal button click
*/
$("#saveAndConnectServerButton").click(function() {
	//Validate form data
	var addServerForm = document.getElementById("addServerForm");
	if(!addServerForm.checkValidity()){
		addServerForm.classList.add('was-validated');
		return;
	}
	
	//Save server
	var name = $("#server-name").val().replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/'/g,"").replace(/"/g,"");
	var wcIp = $("#server-ip").val();
	var wcPort = $("#server-port").val();
	var wcSsl = $("#server-ssl").prop('checked');
	var uri;
	if(wcSsl){
		uri = "wss://" + wcIp + ":" + wcPort;
	}else{
		uri = "ws://" + wcIp + ":" + wcPort;
	}
	persistenceManager.saveServer(new WSServer(name, uri));

	//Close modal
	addServerForm.classList.remove('was-validated');
	$("#addServerModal").modal('hide');

	//Empty all modal values
	$("#server-name").val("");
	$("#server-ip").val("");
	$("#server-port").val("");
	
	//Update GUI serverlist
	updateServerList();
	
	//Connect to server
	openServer(name);
});

/**
* Password modal button click
*/
$("#passwordSendButton").click(function() {
	//Close modal
	$('#passwordModal').modal('hide');
});

/**
* Password modal Enter key pressed
*/
$("#passwordForm").submit(function(event){
	//Solves bug with forms:
	event.preventDefault();
	
	//Close modal
	$('#passwordModal').modal('hide');
});

/**
* On password modal close (Login)
*/
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
* On send command button click
*/
$("#sendCommandButton").click(function() {
	connectionManager.sendConsoleCmd($("#commandInput").val());
	$("#commandInput").val('');
	commandHistoryIndex = -1; //Reset command history index
});

/**
* Enter or arrow down/up key on command input
*/
$("#commandInput").on('keyup', function (e) {
	if(e.which === 13){ //Detect enter key
		//Disable textbox to prevent multiple submit
		$(this).attr("disabled", "disabled");
		
		//Send command
		sendCommandButton.click();

		//Enable the textbox again.
		$(this).removeAttr("disabled");
		
		//Focus again
		$(this).focus();
	}else if(e.which === 38){ //Detect arrow up key
		//Replace with older command
		if(commandHistoryIndex == -1){
			//If not browsing history, start by latest command sent
			commandHistoryIndex = connectionManager.activeConnection.commands.length;
		}
		$("#commandInput").val(connectionManager.activeConnection.commands[commandHistoryIndex - 1]);
		commandHistoryIndex = commandHistoryIndex - 1;
	}else if(e.which === 40){ //Detect arrow down key
		//Replace with newer command
		if(commandHistoryIndex !== -1){
			//If not browsing history, do nothing
			$("#commandInput").val(connectionManager.activeConnection.commands[commandHistoryIndex + 1]);
			commandHistoryIndex = commandHistoryIndex + 1;
		}
	}else if(e.which == 9){ //Detect tab key
		//TODO Suggest user from connectionManager.activeConnection.players;
	}

});

/**
* On delete server button click
*/
$("#deleteServerButton").click(function() {
	var name = connectionManager.activeConnection.serverName;
	//Remove subscribers
	connectionManager.activeConnection.removeSubscribers();
	
	//Delete from active connections
	connectionManager.deleteConnection(name);
	
	//Back to homepage
	backToHomepage();
	
	//Remove from persistence
	persistenceManager.deleteServer(name);
	
	//Update dropdown
	updateServerList();
	
});

/**
* On Navbar Home link clicked
*/
$("#navbarBrandLink").click(function() {
	backToHomepage();
});

/**
* On Navbar Brand link clicked
*/
$("#navbarHomeLink").click(function() {
	backToHomepage();
});

/**
* On DisconnectedModal, back to welcome screen clicked
*/
$("#disconnectionModalWelcomeScreenButton").click(function() {
	backToHomepage();
});

/**
* On Settings link clicked
*/
$("#settingsLink").click(function() {
	//Update modal switches and boxes with saved settings
	$("#showDateSettingsSwitch").prop("checked", persistenceManager.getSetting("dateTimePrefix"));
	$("#readLogFileSwitch").prop("checked", persistenceManager.getSetting("retrieveLogFile"));
});

/**
* On showDateSettingsSwitch switched
*/
$("#showDateSettingsSwitch").click(function() {
	//Update modal switches and boxes with saved settings
	persistenceManager.setSetting("dateTimePrefix", $("#showDateSettingsSwitch").is(":checked"));
});

/**
* On readLogFileSwitch switched
*/
$("#readLogFileSwitch").click(function() {
	//Update modal switches and boxes with saved settings
	persistenceManager.setSetting("retrieveLogFile", $("#readLogFileSwitch").is(":checked"));
});