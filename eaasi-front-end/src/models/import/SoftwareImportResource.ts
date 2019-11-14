import { IEaasiResource } from '@/types/Resource';

export default class SoftwareImportResource implements IEaasiResource {
	id: number = 0;
	title: string = '';
	localIdentifier: string = '';
	localIdentifierSource: string = '';
	version: string = '';
	resourceType: any = null;
	nativeConfig: string = '';
	isUrlSource: boolean = false;
	patchId: string = '';
	urlSource: string = '';
	eaasiID: string = '';
	chosenTemplateId: string = '';
	saveDescription: string = '';
}
