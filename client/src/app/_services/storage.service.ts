import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ServerDto } from '../_dto/ServerDto';
import { StoredDataDto } from '../_dto/StoredDataDto';

@Injectable({
	providedIn: 'root'
})
export class StorageService {

	//BehaviorSubjects for latest settings values
	public widerViewportSubject = new BehaviorSubject<boolean>(false);

	constructor() {
		this.initializeLocalStorage();
	}

	/**
	 * Initialize settings
	 */
	private initializeLocalStorage(): void {
		//If undefined, initialize localStorage
		if (typeof window.localStorage["WebConsole"] === 'undefined') {
			//Create empty object
			var storageObj: StoredDataDto = {
				servers: [],
				language: "",
				settings: {
					dateTimePrefix: true,
					retrieveLogFile: true,
					blurryUri: false,
					widerViewport: false
				}
			};

			//Save to WebStorage
			window.localStorage["WebConsole"] = JSON.stringify(storageObj);
		}

		//Initialize BehaviorSubjects
		this.widerViewportSubject.next(this.getSetting(SettingsEnum.WiderViewport));
	}

	/**
	 * Get a list of all saved servers
	 * @returns List of all servers saved
	 */
	public getAllServers(): ServerDto[] {
		var storageObj = JSON.parse(window.localStorage["WebConsole"]) as StoredDataDto;
		return storageObj.servers;
	}

	/**
	 * Get server info given its name
	 * @param serverName Server name
	 * @returns Server details, null if not found
	 */
	public getServer(serverName: string): ServerDto | undefined {
		return this.getAllServers().find(e => e.serverName == serverName);
	}

	/**
	 * Save a new server or, in case a server with same name already exists, update it.
	 * @param serverName Name of the server to add or update
	 * @param serverUri URI of the server
	 */
	public saveServer(serverName: string, serverUri: string, serverPassword?: string): void {
		//Get all saved servers
		let servers = this.getAllServers();

		let server = servers.find(e => e.serverName == serverName);
		if (server) {
			//If server exists, update it
			(server as ServerDto).serverURI = serverUri;
			if (serverPassword)
				(server as ServerDto).serverPassword = serverPassword;
			else if (serverPassword == null)
				(server as ServerDto).serverPassword = undefined;
		} else {
			//If it does not exist, add to the array
			const serverToSave: ServerDto = {
				serverName: serverName,
				serverURI: serverUri,
				serverPassword: serverPassword
			}

			servers.push(serverToSave);
		}

		//Overwrite array
		this.replaceAllServers(servers);
	}

	moveServerToIndex(serverName: string, newIndex: number): void {
		//Prevent moving if index is not valid
		const listOfServers: ServerDto[] = this.getAllServers();
		if (newIndex < 0 || newIndex >= listOfServers.length) {
			return;
		}

		//Prevent moving if server does not exist
		const serverIndex = listOfServers.findIndex(e => e.serverName == serverName);
		if (serverIndex === -1)
			return;

		//Move server
		const serverToMove: ServerDto = listOfServers.find(e => e.serverName == serverName) as ServerDto;
		listOfServers.splice(serverIndex, 1); //Remove element from its current position
		listOfServers.splice(newIndex, 0, serverToMove); //Inject element in new position
		this.replaceAllServers(listOfServers);
	}

	/**
	 * Delete a server given its name
	 * @param serverName Name of the server
	 */
	public deleteServer(serverName: string): void {
		//Get all servers
		var servers = this.getAllServers();

		//Delete it
		servers = servers.filter(e => e.serverName != serverName)

		//Save to LocalStorage
		this.replaceAllServers(servers);
	}

	/**
	 * Save to persistence a new default language
	 * @param lang Language to set
	 */
	public setLanguage(lang: string): void {
		//Retrieve saved data
		var storageObj = JSON.parse(window.localStorage["WebConsole"]) as StoredDataDto;
		storageObj.language = lang;

		//Save to WebStorage
		window.localStorage["WebConsole"] = JSON.stringify(storageObj);
	}

	/**
	 * Get saved language
	 * @returns Language saved
	 */
	public getLanguage(): string {
		var storageObj = JSON.parse(window.localStorage["WebConsole"]) as StoredDataDto;
		if (!storageObj.language)
			return "en_US";
		return storageObj.language;
	}

	/**
	 * Replace ALL servers with the provided server list
	 * @param newServerList New server list
	 */
	private replaceAllServers(newServerList: ServerDto[]) {
		//Retrieve saved data
		let storageObj = JSON.parse(window.localStorage["WebConsole"]) as StoredDataDto;
		storageObj.servers = newServerList;

		//Save to WebStorage
		window.localStorage["WebConsole"] = JSON.stringify(storageObj);
	}

	/**
	 * Update setting value
	 * @param setting Setting to set
	 * @param value Value to set
	 */
	public setSetting(setting: SettingsEnum, value: any) {
		let currentSettings = JSON.parse(window.localStorage["WebConsole"]) as StoredDataDto;

		switch (setting) {
			case SettingsEnum.DateTimePrefix:
				currentSettings.settings.dateTimePrefix = value;
				break;
			case SettingsEnum.RetrieveLogFile:
				currentSettings.settings.retrieveLogFile = value;
				break;
			case SettingsEnum.BlurryUri:
				currentSettings.settings.blurryUri = value;
				break;
			case SettingsEnum.WiderViewport:
				currentSettings.settings.widerViewport = value;
				this.widerViewportSubject.next(value);
				break;
		}

		//Save all
		let storageObj = JSON.parse(window.localStorage["WebConsole"]);
		storageObj.settings = currentSettings.settings;
		window.localStorage["WebConsole"] = JSON.stringify(storageObj);
	}

	/**
	 * Get a setting
	 * @param setting Setting to get
	 * @returns Settings value
	 */
	public getSetting(setting: SettingsEnum) {
		let currentSettings = JSON.parse(window.localStorage["WebConsole"]) as StoredDataDto;

		switch (setting) {
			case SettingsEnum.DateTimePrefix:
				return currentSettings.settings.dateTimePrefix;
			case SettingsEnum.RetrieveLogFile:
				return currentSettings.settings.retrieveLogFile;
			case SettingsEnum.BlurryUri:
				return currentSettings.settings.blurryUri;
			case SettingsEnum.WiderViewport:
				return currentSettings.settings.widerViewport;
		}
	}

	/**
	 * Import settings from a Base64-encoded JSON
	 * @param base64settings Encoded settings
	 * @returns True if imported successfully, false otherwise
	 */
	public importSettings(base64settings: string): boolean {
		try {
			const decodedJsonSettings = atob(base64settings);
			window.localStorage["WebConsole"] = decodedJsonSettings;
			return true;
		} catch (e) {
			return false;
		}

	}

	/**
	 * Export settings
	 * @returns A Base64-encoded JSON containing settings
	 */
	public getExportString(): string {
		return btoa(window.localStorage["WebConsole"]);
	}
}

export enum SettingsEnum {
	DateTimePrefix,
	RetrieveLogFile,
	BlurryUri,
	WiderViewport
}