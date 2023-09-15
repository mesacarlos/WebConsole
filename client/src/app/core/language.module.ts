import { HttpClient } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { LanguageService } from "../_services/language.service";

export const HttpLoaderFactory = (http: HttpClient): TranslateHttpLoader => {
	return new TranslateHttpLoader(http, "./assets/i18n/")
}

@NgModule({
	declarations: [],
	imports: [TranslateModule.forRoot({
		loader: {
			provide: TranslateLoader,
			useFactory: HttpLoaderFactory,
			deps: [HttpClient]
		}
	})],
	exports: []
})
export class LanguageModule {
	readonly VALID_LANGUAGES = ["en", "es", "de", "fr", "no", "pl", "ru", "zh"];

	constructor(private languageService: LanguageService) {
		this.setup();
	}

	private setup(): void {
		//If a language is set in persistence, and it is supported by the app, use it
		const persistenceLanguage = this.languageService.getLanguage();

		if (this.VALID_LANGUAGES.includes(persistenceLanguage)) {
			this.languageService.setLanguage(persistenceLanguage);
		} else {
			//If language is not defined in persistence, check browser default language: If browser uses a supported language, use it. Otherwise, use english.
			const browserLang = navigator.language.substring(0, 2);
			const defaultLang = this.VALID_LANGUAGES.includes(browserLang) ? browserLang : "en";

			this.languageService.setLanguage(defaultLang);
		}

	}

}