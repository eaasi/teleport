import { AnyObject } from '../general/generic';
import { ArchiveType, IEaasiResource, ResourceType } from '../resource/Resource';
import { KeyValuePair } from './Emil';

/*============================================================
 == Emulators
/============================================================*/

export interface EmulatorImage {
	url: string;
	id: string;
	type: string;
	fstype: string;
}

export interface EmulatorProvenance {
	ociSourceUrl: string;
	versionTag: string;
	layers: string[];
}

export interface EmulatorEntry {
	name: string;
	version: string;
	image: EmulatorImage;
	provenance: EmulatorProvenance;
	digest: string;
	label?: string;
}

export interface ImageEntry {
	id: string;
	label: string;
	kind: string;
	category: string;
}

export interface EmulatorEntries {
	entry: KeyValuePair<EmulatorEntry>[];
}

export interface AliasEntry {
	name: string;
	version: string;
	alias: string;
}

export interface Aliases {
	entry: KeyValuePair<AliasEntry>[];
}

export interface EmulatorNamedIndexes {
	entries: EmulatorEntries;
	aliases: Aliases;
}

export interface IEaasiEmulatorEntry extends EmulatorEntry {
	resourceType: ResourceType;
}

/*============================================================
 == Environments
/============================================================*/

export interface IEnvironment extends IEaasiResource {
	archive: ArchiveType;
	author?: any;
	userId?: string;
	canProcessAdditionalFiles: boolean;
	connectEnvs: boolean;
	description: string;
	drives: IDrive[];
	emulator: string;
	enableInternet: boolean;
	enablePrinting: boolean;
	enableRelativeMouse: boolean;
	enableSocks: boolean;
	envId: string;
	envType: string;
	error?: string | AnyObject;
	gwPrivateIp?: any;
	gwPrivateMask?: any;
	helpText?: string;
	installedSoftwareIds: string[];
	localServerMode: boolean;
	nativeConfig: string;
	os?: string;
	owner: string;
	parentEnvId: string;
	revisions: IEnvironmentRevision[];
	serverIp?: any;
	serverMode: boolean;
	serverPort?: any;
	shutdownByOs: boolean;
	timeContext?: any;
	title: string;
	userTag?: string;
	useXpra: boolean;
	version?: string;
	xpraEncoding?: any;
}

export interface IEnvironmentRevision {
	id: string;
	text: string;
	archive: string;
	timestamp: string;
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

export interface IEnvironmentListItem extends IEaasiResource {
	envId: string;
	title: string;
	archive: ArchiveType;
	owner: string;
	envType: string;
	operatingSystem: string;
	timestamp: string;
	description: string;
	isLinuxRuntime: boolean;
	networkEnabled: boolean;
}

export interface IImageListItem extends IEaasiResource {
	id: string;
	title: string;
	resourceType: ResourceType;
	archive?: ArchiveType;
	archiveId?: ArchiveType;
	isPublic: boolean;
}