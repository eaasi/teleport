import { IEaasiResource } from '@/types/Resource';

export default class ContentImportResource {
	id: number = 0;
	title: string = '';
	localIdentifier: string = '';
	localIdentifierSource: string = '';
	version: string = '';
	resourceType: any = null;
	nativeConfig: string = '';
	patchId: string = '';
	urlSource: string = '';
	eaasiId: string = '';
	chosenTemplateId: string = '';
	isImport: boolean = false;
	saveDescription: string = '';
	isPublic: boolean = false;
}
