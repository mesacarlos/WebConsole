import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { SanitizePipe } from './sanitize.pipe';

@NgModule({
	exports: [
		TranslateModule,
		FormsModule,
		FontAwesomeModule,
		NgbModule,
		ReactiveFormsModule,
		RouterModule,
		CommonModule,
		SanitizePipe
	],
	declarations: [
		SanitizePipe
	],
	imports: [
		TranslateModule,
		CommonModule
	]
})
export class SharedModule { }
