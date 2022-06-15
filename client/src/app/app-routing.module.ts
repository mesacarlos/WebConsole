import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './core/layout/layout.component';

const routes: Routes = [
	{
		path: '',
		component: LayoutComponent,
		children: [
			//Content
			{
				path: '',
				loadChildren: () =>
					import('./content/content.module').then(
						(m) => m.ContentModule
					)
			}
		]
	},
	{
		path: '**',
		redirectTo: ''
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
