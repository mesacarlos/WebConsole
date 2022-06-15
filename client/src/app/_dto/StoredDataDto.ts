import { ServerDto } from "./ServerDto";
import { SettingsDto } from "./SettingsDto";

export interface StoredDataDto {
	servers: ServerDto[];
	language: string;
	settings: SettingsDto;
}