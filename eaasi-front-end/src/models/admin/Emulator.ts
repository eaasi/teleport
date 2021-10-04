import { IEmulator, IEmulatorEntry } from 'eaasi-admin';

export default class Emulator implements IEmulator {
	id: string;
	name: string;
	entries: IEmulatorEntry[] = [];
	latestVersion: string | null;
}