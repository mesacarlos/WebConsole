import { Component, HostListener, OnInit, TemplateRef } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { Icons } from 'src/app/shared/icons';
import { WebconsoleService } from 'src/app/_services/webconsole.service';

@Component({
	selector: 'app-server-toolbar',
	templateUrl: './server-toolbar.component.html',
	styleUrls: ['./server-toolbar.component.scss']
})
export class ServerToolbarComponent implements OnInit {
	icons = Icons;
	currentlyConnectedServers: string[] = [];
	maxTabsToShow: number = 0;

	constructor(
		private webConsoleService: WebconsoleService,
		private offcanvasService: NgbOffcanvas,
	) { }

	ngOnInit(): void {
		this.webConsoleService.getActiveConnectionsChangedSubject().subscribe({
			next: () => this.currentlyConnectedServers = this.webConsoleService.getCurrentConnectedServers()
		});
		this.onResize();
	}

	disconnectServer(serverName: string): void {
		this.webConsoleService.closeConnection(serverName);
	}

	@HostListener('window:resize', ['$event'])
	onResize(event?: any): void {
		const windowWidth: number = window.innerWidth;

		//Each tab take aprox. 230px, with this info we can calculate how many tabs can we show at once
		this.maxTabsToShow = Math.floor(windowWidth / 240);
	}

	openOffcanvas(offcanvasContent: TemplateRef<any>) {
		this.offcanvasService.open(offcanvasContent, { ariaLabelledBy: 'offcanvas-connected-servers', position: "end" });
	}

}
