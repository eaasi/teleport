/**
 * Data specification for a Resource component
 */
import { ITag } from './Tag';

export type ResourceType = 'Environment' | 'Software' | 'Content';

export interface IEaasiResource {
	id: number | string
	title: string
	resourceType: ResourceType;
	description?: string;
	envId?: string;
}

export interface IEaasiResourceSummary extends IEaasiResource {
	id: number | string
	title: string
	tagGroup: ITag[]

	/**
	 * Contains key-value pairs of data represented
	 * as an Object. Appears in the right pane of
	 * a SelectableCard
	 */
	content: object

	/**
	 * Contains key-value pairs of data represented as
	 * an Object. Appears after a thematic break following
	 * content in a SelectableCard
	 */
	subContent: object
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
	description: string;
	version?: string;
	emulator: string;
	helpText?: string;
	enableRelativeMouse: boolean;
	enablePrinting: boolean;
	shutdownByOs: boolean;
	timeContext?: any;
	serverMode: boolean;
	localServerMode: boolean;
	enableSocks: boolean;
	serverPort?: any;
	serverIp?: any;
	gwPrivateIp?: any;
	gwPrivateMask?: any;
	enableInternet: boolean;
	connectEnvs: boolean;
	author?: any;
	canProcessAdditionalFiles: boolean;
	archive: string;
	xpraEncoding?: any;
	owner: string;
	revisions: IEnvironmentRevision[];
	installedSoftwareIds: string[];
	userTag?: string;
	os?: string;
	nativeConfig: string;
	useXpra: boolean;
	envType: string;
	type: string;
	childrenEnvIds: any[];
	branches: any[];
	visible: boolean;
	permissions: IEaasPermissions;
	timestamp: Date;
	networking: INetwork;
	containerName?: string;
	containerVersion?: string;
	drives: IDrive[];
	error?: string;
	useWebRTC: boolean;
	containerEmulatorName?: string;
	containerEmulatorVersion?: string;
	isLinuxRuntime?: boolean;
	processAdditionalFiles?: boolean;
	time?: Date;
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
	hasError?: boolean;
}

export interface IEaasPermissions {
	user: string;
}

export interface IEnvironmentRevision {
	id: string;
	text: string;
	archive: string;
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

export interface ISoftwareResource extends IEaasiResource {
	//TODO:
}

export type PhysicalFormat = 'Floppy Disk' | 'CD-ROM' | 'Disk';