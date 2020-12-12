/**
 WebConsole API for WebConsole
 Used to manage active connections
 https://github.com/mesacarlos
 2019-2020 Carlos Mesa under MIT License.
*/
class WebConsoleAPI {
	constructor(serverURI){
		this.activeConnection = new WebConsoleConnector(serverURI);
		this.activeConnection.subscribe(this.onMsg);
		this.activeConnection.connect();
	}
	
	/**
	* Send password to server
	*/
	login(pwd){
		this.activeConnection.sendToServer({
			command: "LOGIN",
			params: pwd
		});
	}
	
	/**
	* Send console command to server
	*/
	sendConsoleCmd(cmd){
		this.activeConnection.sendToServer({
			command: "EXEC",
			token: this.activeConnection.token,
			params: cmd
		});

		this.activeConnection.commands.push(cmd);
	}
	
	/**
	* Asks server for CPU, RAM and players info
	*/
	askForInfo(){
		this.activeConnection.sendToServer({
			command: "PLAYERS",
			token: this.activeConnection.token,
		});

		this.activeConnection.sendToServer({
			command: "CPUUSAGE",
			token: this.activeConnection.token,
		});

		this.activeConnection.sendToServer({
			command: "RAMUSAGE",
			token: this.activeConnection.token,
		});
	}

	/**
	* Asks server for full latest.log
	*/
	askForLogs(){
		this.activeConnection.sendToServer({
			command: "READLOGFILE",
			token: this.activeConnection.token,
		});
	}
	
	/**
	* This function is executed when a message is received from the server
	*/
	onMsg(message){
		//Print JSON to console. You may remove this line:
		console.log(message);
		
		//Type your code inside the switch cases:
		switch (message.status) {
			case 10:
				//Console Output
				//Info: The weird characters you probably get are the color indicators. Check the link below to learn how the official client parses them
				//https://github.com/mesacarlos/WebConsole/blob/383b0e3420a948a61c7935ff84f40ff159fbd466/client/scripts/WebConsole.js#L128
				break;
			case 200:
				//LoggedIn
				break;
			case 400:
				//Unknown Command
				break;
			case 401:
				//Waiting for login...
				break;
			case 1000:
				//Connected players info
				break;
			case 1001:
				//Cpu Usage info
				break;
			case 1002:
				//RAM Usage info
				break;
			default:
				console.log('Unknown server response:');
		}
	}
}