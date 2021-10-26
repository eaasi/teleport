export interface IMediaRequest {
    envId?: string;
    softwareId: string;
    mediaId: string;
    driveId: number;
}

export interface IDefaultEmulators {
	emulators: IDefaultEmulator[];
}

export interface IDefaultEmulator {
	eaasId: string;
	repositoryUrl: string;
	repositoryName?: string;
	versions?: string;
}

export interface KeyValuePair<T> {
	key: string;
	value: T;
}


export interface EmulatorImage {
	category: string;
	id: string;
	kind: string;
	fstype: string;
}

export interface EmulatorProvenance {
	url: string;
	tag: string;
}

export interface EmulatorEntry {
	name: string;
	version: string;
	image: EmulatorImage;
	provenance: EmulatorProvenance;
	digest: string;
	label?: string;
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