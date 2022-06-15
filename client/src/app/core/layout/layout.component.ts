import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { Icons } from 'src/app/shared/icons';
import { StorageService } from 'src/app/_services/storage.service';
import { WebconsoleService } from 'src/app/_services/webconsole.service';

@Component({
	selector: 'app-layout',
	templateUrl: './layout.component.html',
	styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
	icons = Icons;
	currentlyConnectedServers: string[] = [];
	ifMobileNavigationOpen: boolean = false;
	isWiderViewportEnabled!: boolean;

	constructor(
		private storageService: StorageService,
		private webConsoleService: WebconsoleService,
		private offcanvasService: NgbOffcanvas,
	) { }

	ngOnInit(): void {
		this.storageService.widerViewportSubject.subscribe(value => this.isWiderViewportEnabled = value);

		this.webConsoleService.getActiveConnectionsChangedSubject().subscribe({
			next: () => this.currentlyConnectedServers = this.webConsoleService.getCurrentConnectedServers()
		});
	}

	disconnectServer(serverName: string): void {
		this.webConsoleService.closeConnection(serverName);
	}

	openOffcanvas(offcanvasContent: TemplateRef<any>) {
		this.ifMobileNavigationOpen = true;
		this.offcanvasService.open(offcanvasContent, { ariaLabelledBy: 'offcanvas-navigation' }).result.then((result) => {
			//Closed
			this.ifMobileNavigationOpen = false;
		}, (reason) => {
			//Dismissed
			this.ifMobileNavigationOpen = false;
		});
	}

}
