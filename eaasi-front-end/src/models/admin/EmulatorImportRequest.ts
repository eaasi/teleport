export default class EmulatorImportRequest {
	alias: string = null;
	imageType: string = 'dockerhub';
	isEmulator: boolean = true;
	tag: string = null;
	urlString: string = null;
	update: boolean = false;
}