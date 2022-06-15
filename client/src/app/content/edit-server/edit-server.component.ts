import { AfterViewChecked, Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServerDto } from 'src/app/_dto/ServerDto';
import { StorageService } from 'src/app/_services/storage.service';

@Component({
	selector: 'app-edit-server',
	templateUrl: './edit-server.component.html',
	styleUrls: ['./edit-server.component.scss']
})
export class EditServerComponent implements OnInit {
	@Input() asModal: boolean = false; //If component is being rendered inside a modal

	//Name of the server to edit
	@Input() serverNameBeingEdited!: string;

	//SSL detected
	isClientOverHttps: boolean = location.protocol == 'https:';

	//Add server FormGroup
	editServerFormGroup = new FormGroup({
		serverNameControl: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.maxLength(50)]),
		serverIpControl: new FormControl('', [Validators.required]),
		serverPortControl: new FormControl(8080, [Validators.required, Validators.min(0), Validators.max(99999)]),
		serverPasswordControl: new FormControl({ value: '', disabled: true }),
		serverSslEnabledControl: new FormControl({ value: location.protocol == 'https:', disabled: location.protocol == 'https:' }),
		keepServerPasswordControl: new FormControl(true),
	});

	constructor(
		private storageService: StorageService,
	) { }

	ngOnInit(): void {
		//Load server info
		const savedServer: ServerDto | undefined = this.storageService.getServer(this.serverNameBeingEdited);
		if (savedServer) {
			//Parse address and port
			const addressWithPort = savedServer.serverURI.replace("wss://", "").replace("ws://", "");
			const address = addressWithPort.slice(0, addressWithPort.lastIndexOf(":"));
			const port = addressWithPort.slice(addressWithPort.lastIndexOf(":") + 1);

			//Set values
			this.editServerFormGroup.get("serverNameControl")?.setValue(savedServer.serverName);
			this.editServerFormGroup.get("serverIpControl")?.setValue(address);
			this.editServerFormGroup.get("serverPortControl")?.setValue(port);
			savedServer.serverURI.startsWith("wss://")
				? this.editServerFormGroup.get("serverSslEnabledControl")?.setValue(true)
				: this.editServerFormGroup.get("serverSslEnabledControl")?.setValue(false)
		}
	}

	onUpdatePasswordCheckboxChange(): void {
		if (this.editServerFormGroup.get("keepServerPasswordControl")?.value){
			this.editServerFormGroup.get("serverPasswordControl")?.disable();
			this.editServerFormGroup.get("serverPasswordControl")?.setValue('');
		}
		else
			this.editServerFormGroup.get("serverPasswordControl")?.enable();
	}

	saveServer(modal?: any): void {
		//If form is invalid, stop edit operation
		if (!this.editServerFormGroup.valid) {
			this.editServerFormGroup.markAllAsTouched()
			return;
		}

		//Get form information
		const serverName: string = this.editServerFormGroup.get("serverNameControl")?.value.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "").replace(/"/g, "");
		const serverIp: string = this.editServerFormGroup.get("serverIpControl")?.value;
		const serverPort: string = this.editServerFormGroup.get("serverPortControl")?.value;
		const serverPassword: string = this.editServerFormGroup.get("serverPasswordControl")?.value || null;
		const serverSsl: boolean = this.editServerFormGroup.get("serverSslEnabledControl")?.value;

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
