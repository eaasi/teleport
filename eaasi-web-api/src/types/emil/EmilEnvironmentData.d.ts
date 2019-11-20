import { KeyValuePair } from './Emil';
import {ArchiveType, IEaasiResource} from '../resource/Resource';

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

export interface IEnvironment extends IEaasiResource {
	archive: ArchiveType;
	author?: any;
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
