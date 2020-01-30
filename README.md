# WebConsole

[![GitHub release (latest by date)](https://img.shields.io/github/v/release/mesacarlos/WebConsole)](https://github.com/mesacarlos/WebConsole/releases/latest)
![GitHub All Releases](https://img.shields.io/github/downloads/mesacarlos/WebConsole/total?label=total%20downloads)

WebConsole is a Spigot plugin for Minecraft 1.8-1.15+ that enables you to view your server console and manage your server from anywhere. It creates a WebSocket server in the background used by the web interface to send commands, receive your console log and manage your server.

Dont worry about privacy or security: all data is stored in your browser offline and your PC will connect directly to your minecraft server. No intermediary web servers, just you and your MC server.

#### Additional features:
* Command history: Use up/down arrow keys to browse the command history, like in the real console.
* Colors supported, for both Windows and Linux hosts. (Colors are represented different in each platform).
* Real-time connected players, machine CPU and server RAM usage information.
* Capable of keeping active connections to more than one server to keep retrieving console log in the background for them all.
* English, Spanish, Russian (thanks to Stashenko), Portuguese (thanks to AlexandreMuassab and Connect500BR), French (thanks to pickatchou999), Czech (thanks to Tada) and Chinese (thanks to Neubulae and OPhantomO) supported.
* Free, updated regularly, and many more!

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
> language: en  

Fill `host`, `port` and `password` values. They are, respectively, your server IP, a port where to run this plugin (cannot be the port you are using for Minecraft) and the login password. Password will be asked every time you connect to WebConsole.

Also, you can modify `language` to view console and command messages in your preferred language. Valid languages are English (`en`), Spanish (`es`), Portuguese (`pt`), Russian (`ru`), French (`fr`), Czech (`cs`) and Chinese (`zh`). **IMPORTANT: There is a known issue with Microsoft Windows cmd that shows weird characters when using a language different than English. If you are using Windows to host your server, check [this wiki page](https://github.com/mesacarlos/WebConsole/wiki/Show-local-characters-in-Windows-Console) to solve the problem**.

You can see a tutorial on how to activate SSL [in this link](https://github.com/mesacarlos/WebConsole/wiki/SSL-Configuration). SSL **is not** required for WebConsole to work, you can still use it without encription, unless you are hosting your client in a HTTPS server, in this case is mandatory to enable SSL in all your servers due to web browsers restrictions.


## Using web interface

1. Download web interface (client.zip) from [Releases](https://github.com/mesacarlos/WebConsole/releases).
2. If you want, you can host it in a web server, or use it offline. That's up to you.
3. To start adding servers, click on `Your servers`, and then `Add server`. Fill Server name, IP and WebConsole port (the one you placed into config.yml before), and you are ready to go. You will be prompted for password when connecting.

## Check connected WebConsole clients
Since v1.3, you can use /WebConsole command to view how many clients are connected and their IP address. This is the only Minecraft command provided by this plugin. This command requires you to have `webconsole.webconsole` permission to execute it.


## Technical information

You can find how client and server comunicate [here](https://github.com/mesacarlos/WebConsole/wiki/WebSocket-commands-and-responses).

## Bugs, suggestions or problems configuring WebConsole?
You can open an issue on [GitHub](https://github.com/mesacarlos/WebConsole/issues) or ask me at [Spigot forums](https://www.spigotmc.org/threads/webconsole.390291/).