export default class EmulatorImportRequest {
	readonly imageType: string = 'dockerhub';
	readonly isEmulator: boolean = true;

	alias: string = null;
	tag: string = null;
	urlString: string = null;
	update: boolean = false;
}