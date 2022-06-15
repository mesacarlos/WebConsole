import { Component, OnInit, ViewChild } from '@angular/core';
import { SettingsEnum, StorageService } from 'src/app/_services/storage.service';
import { Icons } from 'src/app/shared/icons';
import { LanguageService } from 'src/app/_services/language.service';

@Component({
	selector: 'app-settings',
	templateUrl: './settings.component.html',
	styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
	icons = Icons;
	//Switch values
	isDateSwitchChecked!: boolean;
	isLogFileSwitchChecked!: boolean;
	isBlurrySwitchChecked!: boolean;
	isWiderSwitchChecked!: boolean;

	//Export data
	exportContainerCollapsed: boolean = true;
	exportString: string = "";

	//Import data
	importContainerCollapsed: boolean = true;
	importString: string = "";
	errorOccuredImporting: boolean | null = null;

	//Language
	savedLanguage!: string;

	constructor(
		private storageService: StorageService,
		private languageService: LanguageService,
	) { }

	ngOnInit(): void {
		//Initialize switches
		this.isDateSwitchChecked = this.storageService.getSetting(SettingsEnum.DateTimePrefix);
		this.isLogFileSwitchChecked = this.storageService.getSetting(SettingsEnum.RetrieveLogFile);
		this.isBlurrySwitchChecked = this.storageService.getSetting(SettingsEnum.BlurryUri);
		this.isWiderSwitchChecked = this.storageService.getSetting(SettingsEnum.WiderViewport);

		//Initialize language selector
		this.savedLanguage = this.storageService.getLanguage();
	}

	onSwitchChanges(): void {
		this.storageService.setSetting(SettingsEnum.DateTimePrefix, this.isDateSwitchChecked);
		this.storageService.setSetting(SettingsEnum.RetrieveLogFile, this.isLogFileSwitchChecked);
		this.storageService.setSetting(SettingsEnum.BlurryUri, this.isBlurrySwitchChecked);
		this.storageService.setSetting(SettingsEnum.WiderViewport, this.isWiderSwitchChecked);
	}

	openExportCollapse(): void {
		this.exportString = this.storageService.getExportString();
		this.exportContainerCollapsed = false;
		this.importContainerCollapsed = true;
	}

	openImportCollapse(): void {
		this.exportContainerCollapsed = true;
		this.importContainerCollapsed = false;
	}

	closeMigrateCollapse(): void {
		this.exportContainerCollapsed = true;
		this.importContainerCollapsed = true;
	}

	onImportClick(): void {
		this.errorOccuredImporting = this.storageService.importSettings(this.importString);
	}

	onLanguageChanged(): void {
		console.log(`Change language to ${this.savedLanguage}`)
		this.languageService.setLanguage(this.savedLanguage);
	}

}
