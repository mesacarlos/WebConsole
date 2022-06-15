import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StorageService } from 'src/app/_services/storage.service';

@Component({
	selector: 'app-add-server',
	templateUrl: './add-server.component.html',
	styleUrls: ['./add-server.component.scss']
})
export class AddServerComponent implements OnInit {

	@Input() asModal: boolean = false; //If component is being rendered inside a modal

	//SSL detected
	isClientOverHttps: boolean = location.protocol == 'https:';

	//Add server FormGroup
	addServerFormGroup = new FormGroup({
		serverNameControl: new FormControl('', [Validators.required, Validators.maxLength(50)]),
		serverIpControl: new FormControl('', [Validators.required]),
		serverPortControl: new FormControl(8080, [Validators.required, Validators.min(0), Validators.max(99999)]),
		serverPasswordControl: new FormControl(''),
		serverSslEnabledControl: new FormControl({ value: location.protocol == 'https:', disabled: location.protocol == 'https:' }),
	});

	//A server with this name was found during save operation
	serverAlreadyExists: boolean = false;

	constructor(
		private storageService: StorageService,
	) { }

	ngOnInit(): void {
	}

	saveServer(modal?: any): void {
		//If form is invalid, stop saving operation
		if (!this.addServerFormGroup.valid) {
			this.addServerFormGroup.markAllAsTouched()
			return;
		}

		//Get form information
		const serverName: string = this.addServerFormGroup.get("serverNameControl")?.value.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "").replace(/"/g, "");
		const serverIp: string = this.addServerFormGroup.get("serverIpControl")?.value;
		const serverPort: string = this.addServerFormGroup.get("serverPortControl")?.value;
		const serverPassword: string = this.addServerFormGroup.get("serverPasswordControl")?.value || undefined;
		const serverSsl: boolean = this.addServerFormGroup.get("serverSslEnabledControl")?.value;
		
		//If a server with this same name exists, stop saving operation
		this.serverAlreadyExists = this.storageService.getAllServers().find(e => e.serverName == serverName) != undefined;
		if (this.serverAlreadyExists) {
			return;
		}

		//Build URI
		let uri;
		if (serverSsl) {
			uri = "wss://" + serverIp + ":" + serverPort;
		} else {
			uri = "ws://" + serverIp + ":" + serverPort;
		}

		//Save server
		this.storageService.saveServer(serverName, uri, serverPassword);

		//If component is being shown in a modal, close it
		if (this.asModal)
			modal?.close('Save server');
	}

}
