import { IEmulator, IEmulatorEntry } from 'eaasi-admin';

export default class Emulator implements IEmulator {
	id: number = 0;
	name: string;
	entries: IEmulatorEntry[] = [];
	latestVersion: string | null;
}