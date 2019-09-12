import { EmulatorEntry } from '@/types/emil/EmilEnvironmentData';

export interface IEmulator {
	id: number;
	name: string;
}

export interface IEmulatorViewModel {
	id: number;
	name: string;
	entries: EmulatorEntry[];
}