import { NgModule } from '@angular/core';

import { ContentRoutingModule } from './content-routing.module';
import { IndexComponent } from './index/index.component';
import { SettingsComponent } from './settings/settings.component';
import { SharedModule } from '../shared/shared.module';
import { AddServerComponent } from './add-server/add-server.component';
import { EditServerComponent } from './edit-server/edit-server.component';
import { ConsoleComponent } from './console/console.component';


@NgModule({
	declarations: [
		IndexComponent,
		SettingsComponent,
  AddServerComponent,
  EditServerComponent,
  ConsoleComponent
	],
	imports: [
		ContentRoutingModule,
		SharedModule
	]
})
export class ContentModule { }
