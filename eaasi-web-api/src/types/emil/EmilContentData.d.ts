import { ArchiveType, IEaasiResource } from '../resource/Resource';

/**
 * Emil returns a list of these objects when queried for content
 */
export interface IContentItem extends IEaasiResource {
	id: string;
	archiveId: ArchiveType;
	label: string;
}

export interface IObjectArchiveResonse {
	status: string;
	archives: ArchiveType[];
}
