import { KeyValuePair } from './Emil';

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