import { IEaasiResource } from '@/types/Resource';

export default class SoftwareImportResource implements IEaasiResource {
	id: number = 0;
	title: string = '';
	localIdentifier: string = '';
	localIdentifierSource: string = '';
	version: string = '';
	resourceType: any = null;
	nativeConfig: string = '';
	urlSource: string = '';
	eaasiId: string = '';
	chosenTemplateId: string = '';
	isImport: boolean = false;
	isKvmEnabled: boolean = false;
	patchId: string = '';
	saveDescription: string = '';
	isPublic: boolean = false;
}
