import { KeyValuePair } from './Emil';
import { IEaasiResource } from '../resource/Resource';

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