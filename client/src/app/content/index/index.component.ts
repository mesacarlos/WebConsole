import { Component, OnInit, TemplateRef } from '@angular/core';
import { ServerDto } from 'src/app/_dto/ServerDto';
import { SettingsEnum, StorageService } from 'src/app/_services/storage.service';
import { Icons } from 'src/app/shared/icons';
import { NgbModal, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { WebconsoleService } from 'src/app/_services/webconsole.service';

@Component({
	selector: 'app-index',
	templateUrl: './index.component.html',
	styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
	icons = Icons;
	blurryUris: boolean = true;
	servers: ServerDto[] = []; //List of servers
	currentlyConnectedServers: string[] = [];

	//Helper properties
	serverClicked!: ServerDto; //When edit or details button is clicked, server is stored here to be able to send it to the modal or the offcasnvas

	constructor(
		private storageService: StorageService,
		private webConsoleService: WebconsoleService,
		private modalService: NgbModal,
		private offcanvasService: NgbOffcanvas,
		private router: Router,
	) { }

	ngOnInit(): void {
		this.blurryUris = this.storageService.getSetting(SettingsEnum.BlurryUri);
		this.refreshServerList();

		this.currentlyConnectedServers = this.webConsoleService.getCurrentConnectedServers();
		this.webConsoleService.getActiveConnectionsChangedSubject().subscribe({
			next: () => this.currentlyConnectedServers = this.webConsoleService.getCurrentConnectedServers()
		})
	}

	refreshServerList(): void {
		this.servers = this.storageService.getAllServers();
	}

	isConnectedTo(serverName: string): boolean {
		return this.currentlyConnectedServers.includes(serverName);
	}

	openModal(modalContent: TemplateRef<any>) {
		this.modalService.open(modalContent, { size: 'lg' }).result.then((result) => {
			//Fullfilled
			this.refreshServerList();
		}, (reason) => {
			//Rejected
			this.refreshServerList();
		});
	}

	openOffcanvas(offcanvasContent: TemplateRef<any>) {
		this.offcanvasService.open(offcanvasContent, { ariaLabelledBy: 'offcanvas-server-details', position: "end" }).result.then((result) => {
			//Closed

		}, (reason) => {
			//Dismissed

		});
	}

	connectServer(serverName: string): void {
		this.router.navigate(['console', serverName]);
	}

	moveServerUp(serverName: string): void {
		const currentIndex: number = this.servers.findIndex(e => e.serverName == serverName);
		this.storageService.moveServerToIndex(serverName, currentIndex - 1);
		this.refreshServerList();
	}

	moveServerDown(serverName: string): void {
		const currentIndex: number = this.servers.findIndex(e => e.serverName == serverName);
		this.storageService.moveServerToIndex(serverName, currentIndex + 1);
		this.refreshServerList();
	}

	deleteServer(serverName: string): void {
		this.webConsoleService.closeConnection(serverName);
		this.storageService.deleteServer(serverName);
		this.refreshServerList();
	}

}
