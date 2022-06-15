import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsoleComponent } from './console/console.component';
import { IndexComponent } from './index/index.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
	{ path: 'console/:serverName', component: ConsoleComponent },
	{ path: 'settings', component: SettingsComponent },
	{ path: '', component: IndexComponent },
	{ path: '**', component: IndexComponent },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ContentRoutingModule { }
