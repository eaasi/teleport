/**
 * Data specification for a Resource component
 */
import { ResourceArchive } from './Search';
import { ITag } from './Tag';

export type ResourceType = 'Environment' | 'Software' | 'Content' | 'Image';

export interface IEaasiResource {
	id?: string
	title: string
	resourceType: ResourceType;
	description?: string;
	envId?: string;
	archiveId?: string;
	archive?: string;
	isPublic: boolean;
}

export interface IImageListItem extends IEaasiResource {
	id: string;
	title: string;
	resourceType: ResourceType;
	archive?: string;
	archiveId?: string;
	isPublic: boolean;
}

export interface IEaasiResourceSummary extends IEaasiResource {
	tagGroup?: ITag[]

	/**
	 * Contains key-value pairs of data represented
	 * as an Object. Appears in the right pane of
	 * a SelectableCard
	 */
	content?: object

	/**
	 * Contains key-value pairs of data represented as
	 * an Object. Appears after a thematic break following
	 * content in a SelectableCard
	 */
	subContent?: object
}

export interface ISaveEnvironmentPayload {
	type: string,
	envId: string,
	message: string,
	title: string,
	softwareId: string,
	objectId: string,
	userId: string,
	isRelativeMouse: boolean
}

/*============================================================
 == Environments
/============================================================*/

export interface IEnvironmentList {
	environments: IEnvironment[];
	status: string | number;
}

export interface IEnvironment extends IEaasiResource {
	parentEnvId: string;
	envId: string;
	title: string;
	driveSettings?: IDriveSetting[];
	description: string;
	version?: string;
	emulator: string;
	helpText?: string;
	enableRelativeMouse: boolean;
	enablePrinting: boolean;
	shutdownByOs: boolean;
	timeContext?: any;
	serverMode?: boolean;
	localServerMode?: boolean;
	enableSocks?: boolean;
	serverPort?: any;
	serverIp?: any;
	gwPrivateIp?: any;
	gwPrivateMask?: any;
	enableInternet?: boolean;
	connectEnvs?: boolean;
	author?: any;
	canProcessAdditionalFiles: boolean;
	archive: ResourceArchive;
	xpraEncoding?: any;
	owner: string;
	revisions: IEnvironmentRevision[];
	installedSoftwareIds: IInstalledSoftware[];
	userTag?: string;
	os?: string;
	nativeConfig: string;
	useXpra: boolean;
	envType: string;
	type?: string;
	childrenEnvIds?: any[];
	branches?: any[];
	visible?: boolean;
	permissions?: IEaasPermissions;
	timestamp: string;
	networking?: INetwork;
	containerName?: string;
	containerVersion?: string;
	drives: IDrive[];
	error?: string;
	isImport?: boolean;
	useWebRTC: boolean;
	containerEmulatorName?: string;
	containerEmulatorVersion?: string;
	isLinuxRuntime?: boolean;
	isServiceContainer?: boolean;
	processAdditionalFiles?: boolean;
	time?: number;
	temp?: boolean;
}

export interface IInstalledSoftware {
	id: string;
	label: string;
	archive: ResourceArchive;
}

export interface IEaasiEnvironmentCardSummary {
	title?: string;
	description?: string;
	archive?: string;
	drives?: any[];
	emulator?: string;
	isInternetEnabled?: boolean;
	isPrintingEnabled?: boolean;
	installedSoftware?: any[];
	error?: string;
}

export interface IEaasPermissions {
	user: string;
}

export interface IEnvironmentRevision {
	id: string;
	text: string;
	archive: string;
}

export interface IDriveSetting {
	drive: IDrive;
	driveIndex: number;
	imageId?: string;
	imageArchive?: string;
	objectArchive?: string;
	objectId?: string;
}

export interface IDrive {
	data: string;
	iface: string;
	filesystem: string;
	bus: string;
	unit: string;
	type: string;
	boot: boolean;
	plugged: boolean;
	uid?: string;
}

export interface IResourceDrive extends IDrive {
	resourceId: string;
	resourceType: ResourceType;
}

export interface INetwork {
	connectEnvs: boolean;
	enableInternet: boolean;
	serverMode: boolean;
	enableSocks: boolean;
	localServerMode: boolean;
	serverIp: string;
	serverPort: string;
	helpText: string;
}

export interface IEditableDrive extends IDrive {
	uid?: string;
}

/*============================================================
 == Software
/============================================================*/

export interface ISoftwarePackage extends IEaasiResource {
	id: string;
	isOperatingSystem: boolean;
	label: string;
}

export interface ISoftwareObject {
	title?: string;
	allowedInstances: number;
	archiveId: string;
	exportFMTs: any[];
	importFMTs: any[];
	isOperatingSystem: boolean;
	licenseInformation: string;
	label?: string;
	nativeFMTs: string[];
	objectId: string;
	qid?: string;
	isPublic: boolean;
}

export interface ISoftwareMetadataResponse {
	metadata: ISoftwareMetadata;
	mediaItems: IContentMediaItems[];
	status: string;
}

export interface ISoftwareMetadata {
	id: string;
	description: string;
	title: string;
}

export interface IOsItem {
	id: string;
	puids: IPuid[];
}

export interface IUIOsItem {
	icon: string;
	title: string;
	value: string;
}

export interface IPuid {
	puid: string;
}

export interface IObjectClassificationRequest {
	archiveId: string;
	objectId: string;
	updateClassification: boolean;
	updateProposal: boolean;
}

/*============================================================
 == Content
/============================================================*/

export interface IContent {
	metadata: IContentMetadata;
	mediaItems: IContentMediaItems;
	status: string;
}

export interface IContentMediaItems {
	file: IContentFile[];
	id: string;
}

export interface IContentFile {
	dataResourceType: string;
	filesize: number;
	id: string;
	isDefault: boolean;
	localAlias?: string;
	type: string;
	url: string;
}

export interface IContentMetadata {
	id: string;
	metsData: string;
	title: string;
}

export interface IContentRequest {
	archiveName: string;
	contentId: string;
}

export interface IOverrideContentRequest {
	description: string;
	environments: [];
	objectArchive: string;
	objectId: string;
}

export interface ISavingEnvironmentState {
	envId: string;
	taskId: string;
}

export type PhysicalFormat = 'Q493576' | 'Q495265' | 'disk' | 'Q82753';
