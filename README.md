# WebConsole

WebConsole is a Spigot plugin for Minecraft 1.8-1.14 that enables you to view your server console and manage your server from anywhere. It creates a WebSocket server in the background used by the web interface to send commands, receive your console log and manage your server.

Dont worry about privacy or security: all data is stored in your browser offline and your PC will connect directly to your minecraft server. No intermediary web servers, just you and your server.


## Plugin installation

1. Download plugin from [Releases](https://github.com/mesacarlos/WebConsole/releases)
2. Open and close your server to generate the config.yml file and open it. You will see something like the following:

> useSSL: false  
> StoreType: JKS  
> KeyStore: plugins/WebConsole/keystore.jks  
> StorePassword: storepassword  
> KeyPassword: keypassword 
> host: localhost  
> port: 8080  
> password: yourPasswordGoesHere  

Fill `host`, `port` and `password` values. They are the IP you server is running at, port where WebSockets will run and login password, respectively. Password will be asked every time you connect to your server.


#### SSL Configuration

If you want to use WebSockets Secure (An encrypted connection between Client and Server instead of sending plaintext) you need to enable it replacing `useSSL: false` to `useSSL: true` in your config.yml and generating your keystore.jks. You can achieve this by generating a selfsigned certificate or using a valid one, like a Let's Encrypt certificate.


##### Selfsigned certificate

The fast way, but only reccomended for testing purposes. Generate your certificate by running this command on your machine

> keytool -genkey -keyalg RSA -validity 3650 -keystore "keystore.jks" -storepass "**storepassword**" -keypass "**keypassword**" -alias "default" -dname "CN=127.0.0.1, OU=**MyOrgUnit**, O=**MyOrg**, L=**MyCity**, S=**MyRegion**, C=**MyCountry**"

Remember to replace required values (the bold ones), so final command looks like this:

> keytool -genkey -keyalg RSA -validity 3650 -keystore "keystore.jks" -storepass "myVerySecurePaSSword" -keypass "aVerySecurePaSSw0rdAgain" -alias "default" -dname "CN=127.0.0.1, OU=WebConsoleDevelopers, O=WebConsole, L=Madrid, S=Madrid, C=Spain"

Then, to enable connections from your browser remember to first navigate to https://localhost:8080/ (change port if you changed it before at config.yml) and skip the security warning (Click on connect anyway). This is required in order to allow your browser to connect to servers using your own selfsigned certificate. If you don´t follow this step, your browser will block connections to your WebSockets Server.


##### Let's Encrypt certificate (or any PEM certificates)

WebConsole does not support PEM certificates, so you will need to convert it to create your keystore.jks file. Follow the steps mentioned in [this guide](https://gist.github.com/xkr47/920ffe94f6a4c171ee59), also explained here:

1. Convert certificate chain + private key to the PKCS#12 file format. You will be asked for a password: Remember it as it will be the StorePassword required in your config.yml
> openssl pkcs12 -export -out keystore.pkcs12 -in fullchain.pem -inkey privkey.pem

2. convert PKCS#12 file into Java keystore format. You will be asked for another password. This time you are typing the KeyPassword, also required in config.yml
> keytool -importkeystore -srckeystore keystore.pkcs12 -srcstoretype PKCS12 -destkeystore keystore.jks

3. PKCS#12 file can be deleted
> rm keystore.pkcs12

4. Copy keystore.jks to your plugin folder (plugins/WebConsole/keystore.jks)


## Using web interface

1. Download web interface from [Releases](https://github.com/mesacarlos/WebConsole/releases)
2. If you want, you can host it in a web server, or use it offline. That's up to you.
3. To start adding servers, click on `Your servers`, and then `Add server`. Fill Server name and URI and you are ready to go. You will be prompted for password when connecting.


## Technical information

You can find how client and server comunicate [here](https://github.com/mesacarlos/WebConsole/wiki/WebSocket-commands-and-responses)

