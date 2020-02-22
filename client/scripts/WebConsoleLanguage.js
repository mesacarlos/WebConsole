/**
 WebConsole Language Manager for WebConsole
 Used to save your preferred language into your browser
 https://github.com/mesacarlos
 2019-2020 Carlos Mesa under MIT License.
*/
function setLanguage(locale){
	//Save to persistence
	persistenceManager.setLanguage(locale);
	//Set locale phrases
	switch(locale){
		case "en_US":
			lang = {
				"navbarHomeLink": "Home",
				"home_header": "Select a server from the menu",
				"home_description": "Use the navigation bar to add a new Minecraft Server or connect to a previously added one.",
				"serversDropdown": "Your servers",
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
				"disconnectionModalDescription": "Connection was lost with the server you were connected to, probably caused by a server stop.",
				"disconnectionModalCloseButton": "Close",
				"disconnectionModalWelcomeScreenButton": "Back to welcome page",
				"settingsLink": "Settings",
				"settingsModalLongTitle": "WebConsole Settings",
				"showDateSettingsSwitchLabel": "Show date and time on each console line",
				"readLogFileSwitchLabel": "Retrieve full log file from server after login",
				"settingsModalCloseButton": "Done",
				"players_online": "Players Online",
				"cpu_title": "CPU",
				"ram_title": "RAM usage",
				"deleteServerButton": "Delete server",
				"sendCommandButton": "Send"
			}
			break;
		case "es_ES":
			lang = {
				"navbarHomeLink": "Inicio",
				"home_header": "Selecciona un servidor del menú",
				"home_description": "Usa la barra superior para añadir un nuevo servidor de Minecraft o para conectarte a un servidor añadido previamente.",
				"serversDropdown": "Tus servidores",
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
				"disconnectionModalDescription": "Se ha perdido la conexión con el servidor al que estabas conectado. Esto puede ser debido a que el servidor se ha cerrado.",
				"disconnectionModalCloseButton": "Cerrar",
				"disconnectionModalWelcomeScreenButton": "Volver a pagina de inicio",
				"settingsLink": "Configuración",
				"settingsModalLongTitle": "Configuración de WebConsole",
				"showDateSettingsSwitchLabel": "Mostrar fecha y hora en cada linea de consola",
				"readLogFileSwitchLabel": "Leer log completo al iniciar sesión",
				"settingsModalCloseButton": "Hecho",
				"players_online": "Jugadores en línea",
				"cpu_title": "CPU",
				"ram_title": "RAM en uso",
				"deleteServerButton": "Borrar servidor",
				"sendCommandButton": "Enviar"
			}
			break;
		case "ru_RU": //Credit to Stashenko
			lang = {
				"navbarHomeLink": "Главная",
				"home_header": "Выберите сервер из меню",
				"home_description": "Используйте панель навигации, чтобы добавить новый сервер Minecraft или подключиться к ранее добавленному.",
				"serversDropdown": "Ваши серверы",
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
				"disconnectionModalCloseButton": "Закрыть",
				"disconnectionModalWelcomeScreenButton": "Вернуться на страницу приветствия",
				"settingsLink": "настройки",
				"settingsModalLongTitle": "настройки WebConsole",
				"showDateSettingsSwitchLabel": "Показать дату и время в каждой строке консоли",
				"readLogFileSwitchLabel": "Получить полный файл журнала с сервера после входа в систему",
				"settingsModalCloseButton": "Выполнено",
				"players_online": "Игроки",
				"cpu_title": "CPU",
				"ram_title": "RAM",
				"deleteServerButton": "Удалить сервер",
				"sendCommandButton": "Отправить"
			}
			break;
		case "pt_BR": //Credit to AlexandreMuassab
			lang = {
				"navbarHomeLink": "Principal",
				"home_header": "Selecione o seu servidor na aba acima.",
				"home_description": "Use a barra de navegação para adicionar ou conectar-se entre os servidores.",
				"serversDropdown": "Servidores",
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
				"disconnectionModalWelcomeScreenButton": "Voltar à página de boas-vindas",
				"settingsLink": "Configurações",
				"settingsModalLongTitle": "Configurações do WebConsole",
				"showDateSettingsSwitchLabel": "Mostrar data e hora em cada linha do console",
				"readLogFileSwitchLabel": "Recuperar arquivo de log completo do servidor após o login",
				"settingsModalCloseButton": "Feito",
				"players_online": "Jogadores online",
				"cpu_title": "Consumo de CPU",
				"ram_title": "Consumo de RAM",
				"deleteServerButton": "Remover este servidor",
				"sendCommandButton": "Enviar"
			}
			break;
		case "zh_CN": //Credit to Neubulae
			lang = {
				"navbarHomeLink": "首页",
				"home_header": "请从菜单中选择一个服务器",
				"home_description": "请使用导航栏以添加新服务器, 或连接至已设定服务器.",
				"serversDropdown": "你的服务器",
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
				"disconnectionModalDescription": "与服务器的通信中断, 可能是因为服务器停止运行.",
				"disconnectionModalCloseButton": "关闭",
				"disconnectionModalWelcomeScreenButton": "返回欢迎页面",
				"settingsLink": "设定值",
				"settingsModalLongTitle": "WebConsole 设定值",
				"showDateSettingsSwitchLabel": "在每个控制台行上显示日期和时间",
				"readLogFileSwitchLabel": "登录后从服务器检索完整的日志文件",
				"settingsModalCloseButton": "完成",
				"players_online": "在线人数",
				"cpu_title": "CPU",
				"ram_title": "内存使用量",
				"deleteServerButton": "关闭服务器",
				"sendCommandButton": "发送"
			}
			break;
		case "fr_FR":
			lang = {
				"navbarHomeLink": "Page d'accueil",
				"home_header": "Sélectionnez un serveur dans le menu",
				"home_description": "Utilisez la barre de navigation pour ajouter un nouveau serveur ou connectez-vous à un autre précédemment ajouté.",
				"serversDropdown": "Vos serveurs",
				"add_server": "Ajouter un serveur",
				"noServersAdded": "Aucun serveur ajouté",
				"lang_dropdown": "Langue",
				"addServerModalLongTitle": "Ajouter un nouveau serveur",
				"addServerModalSvName": "Nom du serveur:",
				"addServerModalSvIp": "Serveur IP:",
				"addServerModalSvPort": "WebConsole port:",
				"addServerModalSvSsl": "SSL est activé",
				"addServerModalSslAdvice": "SSL est requis si vous vous connectez à partir d'un client HTTPS",
				"addServerModalClose": "Fermer",
				"saveAndConnectServerButton": "Enregistrez et connectez",
				"passwordModalLongTitle": "Mot de passe requis",
				"passwordModalLabel": "Mot de passe:",
				"passwordModalRememberLabel": "Se souvenir du mot de passe",
				"passwordModalCloseButton": "Fermer",
				"passwordSendButton": "S'identifier",
				"disconnectionModalLongTitle": "Débranché",
				"disconnectionModalDescription": "La connexion a été perdue avec le serveur auquel vous étiez connecté, probablement en raison d'un arrêt du serveur.",
				"disconnectionModalCloseButton": "Fermer",
				"disconnectionModalWelcomeScreenButton": "Retour à la page d'accueil",
				"settingsLink": "Réglages",
				"settingsModalLongTitle": "Réglages de WebConsole",
				"showDateSettingsSwitchLabel": "Afficher la date et l'heure sur chaque ligne de console",
				"readLogFileSwitchLabel": "Récupérer le fichier journal complet du serveur après la connexion",
				"settingsModalCloseButton": "Terminé",
				"players_online": "Joueurs en ligne",
				"cpu_title": "Utilisation de la CPU",
				"ram_title": "Utilisation de la RAM",
				"deleteServerButton": "Supprimer le serveur",
				"sendCommandButton": "Envoyer"
			}
			break;
		case "cs_CZ":
			lang = {
				"navbarHomeLink": "Domů",
				"home_header": "Vyberte server z nabídky",
				"home_description": "Použijte navigační lištu pro přidání nového minecraftového serveru, nebo pro připojení k existujícímu.",
				"serversDropdown": "Vaše servery",
				"add_server": "Přidat server",
				"noServersAdded": "Nebyly přidány žádné servery",
				"lang_dropdown": "Jazyk",
				"addServerModalLongTitle": "Přidat nový server",
				"addServerModalSvName": "Jméno serveru:",
				"addServerModalSvIp": "IP adresa serveru:",
				"addServerModalSvPort": "Port WebConsole:",
				"addServerModalSvSsl": "SSL je zapnuté na tomto serveru",
				"addServerModalSslAdvice": "SSL je vyžadováno pro připojení klientů pomocí HTTPS",
				"addServerModalClose": "Zavřít",
				"saveAndConnectServerButton": "Uložit a připojit",
				"passwordModalLongTitle": "Vyžadováno heslo",
				"passwordModalLabel": "Heslo:",
				"passwordModalRememberLabel": "Pamatovat si heslo",
				"passwordModalCloseButton": "Zavřít",
				"passwordSendButton": "Přihlásit se",
				"disconnectionModalLongTitle": "Odpojeno",
				"disconnectionModalDescription": "Spojení se serverem s kterým jste byli spojení bylo přerušeno, pravděpodobně z důvodu vypnutí serveru.",
				"disconnectionModalCloseButton": "Zavřít",
				"disconnectionModalWelcomeScreenButton": "Zpět na úvodní stránku",
				"settingsLink": "Nastavení",
				"settingsModalLongTitle": "Nastavení WebConsole",
				"showDateSettingsSwitchLabel": "Zobrazit datum a čas na každé řádce konzoly",
				"readLogFileSwitchLabel": "Po přihlášení načtěte úplný soubor protokolu ze serveru",
				"settingsModalCloseButton": "Hotovo",
				"players_online": "Počet hráčů online",
				"cpu_title": "CPU",
				"ram_title": "Využití RAM",
				"deleteServerButton": "Odstranit server",
				"sendCommandButton": "Odeslat"
			}
			break;
		default:
			console.error("No language set");
	}

	//Set phrases
	jQuery.each(lang, (key, value) =>{
		try{
			document.getElementById(key).textContent = value;
		}catch(err){
			console.error("Cannot translate " + key + " (" + value + ")")
		}
	});

}