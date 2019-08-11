# WebConsole

WebConsole is a Spigot plugin for Minecraft 1.14 that enables you to view your server console and manage your server from anywhere. It creates a WebSocket server in the background used by the web interface to send commands, receive your console log and manage your server.
Dont worry about privacy: all data is stored in your browser offline and your PC will connect directly to your minecraft server. No intermediary web servers, just you and your server.

## Plugin installation
1. Plugin download
2. Filling config.yml. Port and password configuration

## How it works
1. How to install web interface / connect to github pages
2. How to add servers

## Technical information

### WebSocket commands
The following tables represent how server communicates with the client(s), something like a language between them.

#### Websocket Server -> Client
| Code                |Meaning                               |
|---------------------|--------------------------------------|
|200 *(message)*      |Query was processed with no errors    |
|403 *(message)*      |You are not allowed to do that action |
|LOG *(message)*      |Message is a console output           |


#### Client -> Websocket Server
| Code                |Meaning                                  |Extra info    |
|---------------------|-----------------------------------------|--------------|
|LOGIN *(password)*   |Login to start communication with server |              |
|EXEC *(command)*     |Run desired command in Minecraft Server  |Login required|
