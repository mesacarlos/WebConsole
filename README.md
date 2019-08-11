
# WebConsole

WebConsole is a Spigot plugin for Minecraft 1.14 that enables you to view your server console and manage your server from anywhere. It creates a WebSocket server in the background used by the web interface to send commands, receive your console log and manage your server.

Dont worry about privacy: all data is stored in your browser offline and your PC will connect directly to your minecraft server. No intermediary web servers, just you and your server.


## Plugin installation

1. Plugin download
2. Filling config.yml. Port and password configuration
3. SSL config
If generated with
keytool -genkey -keyalg RSA -validity 3650 -keystore "keystore.jks" -storepass "storepassword" -keypass "keypassword" -alias "default" -dname "CN=127.0.0.1, OU=MyOrgUnit, O=MyOrg, L=MyCity, S=MyRegion, C=MyCountry"
then need to https://localhost:8080/


## How it works

1. How to install web interface / connect to github pages
2. How to add servers


## Technical information

### WebSocket commands

The following tables represent how server communicates with the client(s), something like a language between them.


#### Websocket Server -> Client

Server communicate with all connected clients using JSON. The following table shows all possible JSON variables.

| Variable            |Meaning                                                                      |
|---------------------|-----------------------------------------------------------------------------|
| status              |Status code (as integer), representing response type. See listing below*     |
| statusDescription   |Status description (as String) describing status code                        |
| respondsTo          |`(Optional)` Original command sent by client which triggered this response|
| message             |Response content                                                             |

*Status codes are listed below:
 - **010**: Console output.
 - **200**: Ok/Processed.
 - **400**: Unknown command.
 - **401**: Login required/Not logged in.
 - **403**: Forbidden/Unauthorised (Probably not logged in).


#### Client -> Websocket Server

Clients can communicate with server using commands. The following table shows existing commands.

| Code                |Meaning                                  |Extra info    |
|---------------------|-----------------------------------------|--------------|
|LOGIN *(password)*   |Login to start communication with server |              |
|EXEC *(command)*     |Run desired command in Minecraft Server  |Login required|
