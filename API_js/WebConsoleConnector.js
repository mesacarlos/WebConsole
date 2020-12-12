/**
 WebConsole Connector for WebConsole
 Used to connect to WebSocketsServer
 https://github.com/mesacarlos
 2019-2020 Carlos Mesa under MIT License.
*/
class WebConsoleConnector {
	
	constructor(serverURI) {
		this.serverURI = serverURI;
		this.token;
		this.subscribers = []; //List of functions called when a new message arrive
		this.messages = []; //All messages retrieved since connection start
		this.commands = []; //EXEC Commands sent by user to this server
		this.isLogged = false; //Is logged in with valid pasword or not
	}
	
	/**
	* Connect to WebSocket
	*/
	connect(){
		var connector = this;
		this.websocket = new WebSocket(this.serverURI);
		this.websocket.onopen = function(evt) { connector.onOpen(evt) };
		this.websocket.onclose = function(evt) { connector.onClose(evt) };
		this.websocket.onmessage = function(evt) { connector.onMessage(evt) };
		this.websocket.onerror = function(evt) { connector.onError(evt) };
	}
	
	/**
	* Internal function
	*/
	onOpen(evt){
		//Event: Connection opened
	}
	
	/**
	* Internal function
	*/
	onClose(evt){
		console.log("Closed reason: " + evt.reason); //No reason provided (using chrome at least)
	}
	
	/**
	* Internal function
	*/
	onMessage(evt){
		var obj = JSON.parse(evt.data);
		
		//Sucessfully connected? Save token
		if(obj.status === 200){
			this.token = obj.token;
			this.isLogged = true;
		}
		
		this.notify(obj); //Notify all subscribers
		this.messages.push(obj);
	}
	
	/**
	* Internal function
	*/
	onError(evt){
		//Error occurred on the connection
	}
	
	/**
	* Notifies a new message to all subscribers
	*/
	notify(obj){
		this.subscribers.forEach(function(fun) {
			fun(obj); //Calls function with this object
		});
	}
	
	/**
	* Sends a WebSocket command to Server
	*/
	sendToServer(message){
		this.websocket.send(JSON.stringify(message));
	}
	
	/**
	* Adds a function to subscriber list
	*/
	subscribe(func){
		this.subscribers.push(func);
	}
	
	/**
	* Unsubscribe all subscribers
	*/
	removeSubscribers(){
		this.subscribers = [];
	}
}