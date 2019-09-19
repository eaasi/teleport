/**
 * Data specification for a Resource component
 */
import { ITag } from './Tag';

export type ResourceType = 'Environment' | 'Software' | 'Content';

export interface IEaasiResource {
	/**
	 * A unique identifier for the Resource object
	 */
	id: number | string

	/**
	 * The title of a Resource object
	 */
	title: string
}

export interface IEaasiResourceSummary extends IEaasiResource {
	/**
	 * A unique identifier for the Resource object
	 */
	id: number | string

	/**
	 * The title of a Resource object
	 */
	title: string

	/**
	 * A group of Tags
	 */
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
}

export interface IEnvironmentRevision {
	id: string;
	text: string;
	archive: string;
}

/*============================================================
 == Software
/============================================================*/

export interface ISoftwarePackage extends IEaasiResource {
	id: string;
	isOperatingSystem: boolean;
	label: string;
}