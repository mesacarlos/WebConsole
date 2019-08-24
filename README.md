# WebConsole

WebConsole is a Spigot plugin for Minecraft 1.8-1.14 that enables you to view your server console and manage your server from anywhere. It creates a WebSocket server in the background used by the web interface to send commands, receive your console log and manage your server.

Dont worry about privacy or security: all data is stored in your browser offline and your PC will connect directly to your minecraft server. No intermediary web servers, just you and your MC server.

#### Additional features:
* Command history: Use up/down arrow keys to browse the command history, like in the real console.
* Colors supported, for both Windows and Linux hosts. (Colors are represented different in each platform).
* Real-time connected players, machine CPU and server RAM usage information.
* English, Spanish and Russian (thanks to Stashenko) supported.
* Free and updated regularly.
* And many more!

![Screenshot](https://i.imgur.com/sN1sYju.png)


## Plugin installation

1. Download plugin from [Releases](https://github.com/mesacarlos/WebConsole/releases).
2. Open and close your server to generate the config.yml file and open it. You will see something like the following:

> useSSL: false  
> StoreType: JKS  
> KeyStore: plugins/WebConsole/keystore.jks  
> StorePassword: storepassword  
> KeyPassword: keypassword  
> host: localhost  
> port: 8080  
> password: yourPasswordGoesHere  

Fill `host`, `port` and `password` values. They are, respectively, your server IP, a port where to run this plugin (cannot be the port you are using for Minecraft) and the login password. Password will be asked every time you connect to WebConsole.

You can see a tutorial on how to activate SSL [in this link](https://github.com/mesacarlos/WebConsole/wiki/SSL-Configuration). SSL **is not** required for WebConsole to work, you can still use it without encription.


## Using web interface

1. Download web interface (client.zip) from [Releases](https://github.com/mesacarlos/WebConsole/releases).
2. If you want, you can host it in a web server, or use it offline. That's up to you.
3. To start adding servers, click on `Your servers`, and then `Add server`. Fill Server name, IP and WebConsole port (the one you placed into config.yml before), and you are ready to go. You will be prompted for password when connecting.


## Technical information

You can find how client and server comunicate [here](https://github.com/mesacarlos/WebConsole/wiki/WebSocket-commands-and-responses).

## Bugs, suggestions or problems configuring WebConsole?
You can open an issue on [GitHub](https://github.com/mesacarlos/WebConsole/issues) or ask me at [Spigot forums](https://www.spigotmc.org/threads/webconsole.390291/).