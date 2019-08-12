/**
 Main JS file for WebConsole.
 Version v1.0.0
 https://github.com/mesacarlos
 2019 Carlos Mesa under MIT License.
*/

/**
* Update dropdown with saved server list
*/
function updateServerList(){
	//Delete all servers in dropdown
	$('.servermenuitem').remove();
	
	//Add all servers
	var servers = new WebConsolePersistenceManager().getAllServers();
	for(var i = 0; i < servers.length; i++){
		$('#ServerListDropDown').append('<a class="dropdown-item servermenuitem" href="#" onclick=openServer("' + servers[i].serverName + '")>' + servers[i].serverName + '</a>');
	}
}

/**
* Prepare and show server to user
*/
function openServer(serverName){
	
}