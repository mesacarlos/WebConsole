/**
 WebConsole Language Manager for WebConsole
 Used to save your preferred language into your browser
 https://github.com/mesacarlos
 2019 Carlos Mesa under MIT License.
*/
function setLanguage(locale){
	//Save to persistence
	persistenceManager.setLanguage(locale);
	//Set locale phrases
	switch(locale){
		case "en_US":
			lang = {
				"home_link": "Home",
				"home_header": "Select a server from the menu",
				"home_description": "Use the navigation bar to add a new Minecraft Server or connect to a previously added one.",
				"server_dropdown": "Your servers",
				"add_server": "Add Server",
				"noServersAdded": "No servers added",
				"lang_dropdown": "Language",
				"addServerModalLongTitle": "Add a new server",
				"addServerModalSvName": "Server name:",
				"addServerModalSvIp": "Server IP:",
				"addServerModalSvPort": "WebConsole port:",
				"addServerModalSvSsl": "Server is SSL enabled",
				"addServerModalSslAdvice": "SSL is required for HTTPS client connections",
				"addServerModalClose": "Close",
				"saveAndConnectServerButton": "Save and connect",
				"passwordModalLongTitle": "Password required",
				"passwordModalLabel": "Password:",
				"passwordModalRememberLabel": "Remember password",
				"passwordModalCloseButton": "Close",
				"passwordSendButton": "Login",
				"disconnectionModalLongTitle": "Disconnected",
				"disconnectionModalDescription": "Connection was lost with the server you were connected to, probably caused by a server stop. Moved back to welcome screen.",
				"disconnectionModalCloseButton": "Close",
				"players_online": "Players Online",
				"cpu_title": "CPU",
				"ram_title": "RAM usage",
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
				"noServersAdded": "Ningun servidor guardado",
				"lang_dropdown": "Idioma",
				"addServerModalLongTitle": "Añadir un nuevo servidor",
				"addServerModalSvName": "Nombre del servidor:",
				"addServerModalSvIp": "IP del servidor:",
				"addServerModalSvPort": "Puerto WebConsole:",
				"addServerModalSvSsl": "SSL está activado",
				"addServerModalSslAdvice": "Te estás conectando al cliente por HTTPS, por tanto SSL es obligatorio",
				"addServerModalClose": "Cerrar",
				"saveAndConnectServerButton": "Guardar y conectar",
				"passwordModalLongTitle": "Se necesita contraseña",
				"passwordModalLabel": "Contraseña:",
				"passwordModalRememberLabel": "Recordar contraseña",
				"passwordModalCloseButton": "Cerrar",
				"passwordSendButton": "Iniciar sesión",
				"disconnectionModalLongTitle": "Desconectado",
				"disconnectionModalDescription": "Se ha perdido la conexión con el servidor al que estabas conectado. Esto puede ser debido a que el servidor se ha cerrado. Se ha vuelto a la ventana principal.",
				"disconnectionModalCloseButton": "Cerrar",
				"players_online": "Jugadores en línea",
				"cpu_title": "CPU",
				"ram_title": "RAM en uso",
				"deleteServerButton": "Borrar servidor",
				"sendCommandButton": "Enviar"
			}
			break;
		case "ru_RU": //Credit to Stashenko
			lang = {
				"home_link": "Главная",
				"home_header": "Выберите сервер из меню",
				"home_description": "Используйте панель навигации, чтобы добавить новый сервер Minecraft или подключиться к ранее добавленному.",
				"server_dropdown": "Ваши серверы",
				"add_server": "Добавить сервер",
				"noServersAdded": "Серверы не добавлены",
				"lang_dropdown": "Язык",
				"addServerModalLongTitle": "Добавить новый сервер",
				"addServerModalSvName": "Название сервера:",
				"addServerModalSvIp": "IP сервера:",
				"addServerModalSvPort": "Порт WebConsole:",
				"addServerModalSvSsl": "Сервер с поддержкой SSL",
				"addServerModalSslAdvice": "SSL требуется для клиентских подключений HTTPS",
				"addServerModalClose": "Закрыть",
				"saveAndConnectServerButton": "Сохранить и подключить",
				"passwordModalLongTitle": "Требуется пароль",
				"passwordModalLabel": "Пароль:",
				"passwordModalRememberLabel": "Запомнить пароль",
				"passwordModalCloseButton": "Закрыть",
				"passwordSendButton": "Войти",
				"disconnectionModalLongTitle": "Отключение!",
				"disconnectionModalDescription": "Соединение с сервером, к которому вы подключены, потеряно.",
				"players_online": "Игроки",
				"cpu_title": "CPU",
				"ram_title": "RAM",
				"deleteServerButton": "Удалить сервер",
				"sendCommandButton": "Отправить"
			}
			break;
		case "pt_BR": //Credit to AlexandreMuassab
			lang = {
				"home_link": "Principal",
				"home_header": "Selecione o seu servidor na aba acima.",
				"home_description": "Use a barra de navegação para adicionar ou conectar-se entre os servidores.",
				"server_dropdown": "Servidores",
				"add_server": "Adicionar um servidor",
				"noServersAdded": "Nenhum servidor adicionado",
				"lang_dropdown": "Idioma",
				"addServerModalLongTitle": "Adicionar um novo servidor",
				"addServerModalSvName": "Nome:",
				"addServerModalSvIp": "IP:",
				"addServerModalSvPort": "Porta(config.yml):",
				"addServerModalSvSsl": "SSL do servidor está habilitado ?",
				"addServerModalSslAdvice": "É necessário SSL para conexões do cliente HTTPS",
				"addServerModalClose": "Fechar",
				"saveAndConnectServerButton": "Salvar e conectar",
				"passwordModalLongTitle": "Necessário uma senha",
				"passwordModalLabel": "Senha:",
				"passwordModalRememberLabel": "Deseja salvar esta senha ?",
				"passwordModalCloseButton": "Fechar",
				"passwordSendButton": "Logar",
				"disconnectionModalLongTitle": "desconectado",
				"disconnectionModalDescription": "Você foi desconectado, pode ser que o servidor foi fechado/reiniciado ou pode haver algum problema com a sua conexão.",
				"disconnectionModalCloseButton": "Fechar",
				"players_online": "Jogadores online",
				"cpu_title": "Consumo de CPU",
				"ram_title": "Consumo de RAM",
				"deleteServerButton": "Remover este servidor",
				"sendCommandButton": "Enviar"
			}
			break;
		case "zh_CN": //Credit to Neubulae
			lang = {
				"home_link": "首页",
				"home_header": "请从菜单中选择一个服务器",
				"home_description": "请使用导航栏以添加新服务器, 或连接至已设定服务器.",
				"server_dropdown": "你的服务器",
				"add_server": "添加服务器",
				"noServersAdded": "没有添加服务器",
				"lang_dropdown": "语言",
				"addServerModalLongTitle": "添加一个新服务器",
				"addServerModalSvName": "服务器名称:",
				"addServerModalSvIp": "服务器IP地址:",
				"addServerModalSvPort": "WebConsole端口:",
				"addServerModalSvSsl": "服务器已开启SSL",
				"addServerModalSslAdvice": "HTTPS客户端连接需要SSL",
				"addServerModalClose": "关闭",
				"saveAndConnectServerButton": "保存并连接",
				"passwordModalLongTitle": "需要密码",
				"passwordModalLabel": "密码:",
				"passwordModalRememberLabel": "记住密码",
				"passwordModalCloseButton": "关闭",
				"passwordSendButton": "登录",
				"disconnectionModalLongTitle": "已断开",
				"disconnectionModalDescription": "与服务器的通信中断, 可能是因为服务器停止运行. 已回到欢迎界面.",
				"disconnectionModalCloseButton": "关闭",
				"players_online": "在线人数",
				"cpu_title": "CPU",
				"ram_title": "内存使用量",
				"deleteServerButton": "关闭服务器",
				"sendCommandButton": "发送"
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
	document.getElementById("addServerModalSslAdvice").textContent = lang.addServerModalSslAdvice;
	document.getElementById("addServerModalClose").textContent = lang.addServerModalClose;
	document.getElementById("saveAndConnectServerButton").textContent = lang.saveAndConnectServerButton;
	document.getElementById("passwordModalLongTitle").textContent = lang.passwordModalLongTitle;
	document.getElementById("passwordModalLabel").textContent = lang.passwordModalLabel;
	document.getElementById("passwordModalRememberLabel").textContent = lang.passwordModalRememberLabel;
	document.getElementById("passwordModalCloseButton").textContent = lang.passwordModalCloseButton;
	document.getElementById("passwordSendButton").textContent = lang.passwordSendButton;
	document.getElementById("disconnectionModalLongTitle").textContent = lang.disconnectionModalLongTitle;
	document.getElementById("disconnectionModalDescription").textContent = lang.disconnectionModalDescription;
	document.getElementById("disconnectionModalCloseButton").textContent = lang.disconnectionModalCloseButton;
	document.getElementById("players_online").textContent = lang.players_online;
	document.getElementById("cpu_title").textContent = lang.cpu_title;
	document.getElementById("ram_title").textContent = lang.ram_title;
	document.getElementById("deleteServerButton").textContent = lang.deleteServerButton;
	document.getElementById("sendCommandButton").textContent = lang.sendCommandButton;
}