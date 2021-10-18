import { EmulatorEntry } from '@/types/emil/EmilEnvironmentData';

export interface IEmulator {
	id: number;
	name: string;
}

export interface IEmulatorMetaData {
	id: number;
	name: string;
	digest: string;
	version: string;
	image: IEmulatorImage;
	provenance: IEmulatorProvenance;
	label?: string;
	kind: string;
}

export interface IEmulatorImage {
	id: string;
	category: string;
	fstype: string;
	kind: string;
}

export interface IEmulatorProvenance {
	tag: string;
	url: string;
}

export interface IEmulatorViewModel {
	name: string;
	entries: EmulatorEntry[];
	latestVersion: string | null;
}