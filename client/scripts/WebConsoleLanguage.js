/**
 WebConsole Language Manager for WebConsole
 Used to save your preferred language into your browser
 https://github.com/mesacarlos
 2019 Carlos Mesa under MIT License.
*/
function setLanguage(locale){
	//Save to persistence
	persistenceManager.setLanguage(locale);
	//Set dialog phrases
	switch(locale){
		case "en_US":
			lang = {
				"home_link": "Home",
				"home_header": "Select a server from the menu",
				"home_description": "Use the navigation bar to add a new Minecraft Server or connect to a previously added one.",
				"server_dropdown": "Your servers",
				"add_server": "Add Server",
				"lang_dropdown": "Language",
				"addServerModalLongTitle": "Add a new server",
				"addServerModalSvName": "Server name:",
				"addServerModalSvIp": "Server IP:",
				"addServerModalSvPort": "WebConsole port:",
				"addServerModalSvSsl": "Server is SSL enabled",
				"addServerModalClose": "Close",
				"saveAndConnectServerButton": "Save and connect",
				"passwordModalLongTitle": "Password required",
				"passwordModalLabel": "Password:",
				"passwordModalRememberLabel": "Remember password",
				"passwordModalCloseButton": "Close",
				"passwordSendButton": "Login",
				"disconnectionModalLongTitle": "Disconnected",
				"disconnectionModalDescription": "Connection was lost with the server you were connected to, probably caused by a server stop. Moved back to welcome screen.",
				"players_online": "Players Online",
				"deleteServerButton": "Delete server",
				"sendCommandButton": "Send"
			}
			break;
		case "es_ES":
			lang = {
				"home_link": "Inicio",
				"home_header": "Selecciona un servidor del menú",
				"home_description": "Usa la barra superior para añadir un nuevo servidor de Minecraft o para conectarte a un servidor añadido previamente.",
				"server_dropdown": "Tus servidores",
				"add_server": "Añadir Server",
				"lang_dropdown": "Idioma",
				"addServerModalLongTitle": "Añadir un nuevo servidor",
				"addServerModalSvName": "Nombre del servidor:",
				"addServerModalSvIp": "IP del servidor:",
				"addServerModalSvPort": "Puerto WebConsole:",
				"addServerModalSvSsl": "SSL está activado",
				"addServerModalClose": "Cerrar",
				"saveAndConnectServerButton": "Guardar y conectar",
				"passwordModalLongTitle": "Se necesita contraseña",
				"passwordModalLabel": "Contraseña:",
				"passwordModalRememberLabel": "Recordar contraseña",
				"passwordModalCloseButton": "Cerrar",
				"passwordSendButton": "Iniciar sesión",
				"disconnectionModalLongTitle": "Desconectado",
				"disconnectionModalDescription": "Se ha perdido la conexión con el servidor al que estabas conectado. Esto puede ser debido a que el servidor se ha cerrado. Se ha vuelto a la ventana principal.",
				"players_online": "Jugadores en línea",
				"deleteServerButton": "Borrar servidor",
				"sendCommandButton": "Enviar"
			}
			break;
		default:
			console.error("No language set");
	}
	//Set navbar phrases
	document.getElementById("navbarHomeLink").textContent = lang.home_link;
	document.getElementById("home_header").textContent = lang.home_header;
	document.getElementById("home_description").textContent = lang.home_description;
	document.getElementById("serversDropdown").textContent = lang.server_dropdown;
	document.getElementById("add_server").textContent = lang.add_server;
	document.getElementById("lang_dropdown").textContent = lang.lang_dropdown;
	document.getElementById("addServerModalLongTitle").textContent = lang.addServerModalLongTitle;
	document.getElementById("addServerModalSvName").textContent = lang.addServerModalSvName;
	document.getElementById("addServerModalSvIp").textContent = lang.addServerModalSvIp;
	document.getElementById("addServerModalSvPort").textContent = lang.addServerModalSvPort;
	document.getElementById("addServerModalSvSsl").textContent = lang.addServerModalSvSsl;
	document.getElementById("addServerModalClose").textContent = lang.addServerModalClose;
	document.getElementById("saveAndConnectServerButton").textContent = lang.saveAndConnectServerButton;
	document.getElementById("passwordModalLongTitle").textContent = lang.passwordModalLongTitle;
	document.getElementById("passwordModalLabel").textContent = lang.passwordModalLabel;
	document.getElementById("passwordModalRememberLabel").textContent = lang.passwordModalRememberLabel;
	document.getElementById("passwordModalCloseButton").textContent = lang.passwordModalCloseButton;
	document.getElementById("passwordSendButton").textContent = lang.passwordSendButton;
	document.getElementById("disconnectionModalLongTitle").textContent = lang.disconnectionModalLongTitle;
	document.getElementById("disconnectionModalDescription").textContent = lang.disconnectionModalDescription;
	document.getElementById("players_online").textContent = lang.players_online;
	document.getElementById("deleteServerButton").textContent = lang.deleteServerButton;
	document.getElementById("sendCommandButton").textContent = lang.sendCommandButton;
}