import { EmulatorEntry } from '@/types/emil/EmilEnvironmentData';

export interface IEmulator {
	id: number;
	name: string;
}

export interface IEmulatorViewModel {
	id: string;
	name: string;
	entries: EmulatorEntry[];
	latestVersion: string | null;
}