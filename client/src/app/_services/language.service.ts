import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from './storage.service';

@Injectable({
	providedIn: 'root'
})
export class LanguageService {

	constructor(
		private storageService: StorageService,
		private translateService: TranslateService
	) { }

	public setLanguage(language: string): void {
		this.translateService.use(language);
		this.storageService.setLanguage(language);
	}

	public getLanguage(): string {
		return this.storageService.getLanguage();
	}
}
