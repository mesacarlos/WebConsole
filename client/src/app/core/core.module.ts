import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { LayoutComponent } from './layout/layout.component';
import { ServerToolbarComponent } from './server-toolbar/server-toolbar.component';

@NgModule({
	declarations: [
		LayoutComponent,
		ServerToolbarComponent,
	],
	imports: [
		SharedModule
	],
	exports: [
		LayoutComponent,
		ServerToolbarComponent,
	]
})
export class CoreModule { }
