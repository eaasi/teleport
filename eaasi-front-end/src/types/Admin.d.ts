declare module 'eaasi-admin' {

	/* Emulator
	============================================*/

	export interface IEmulator {
		id: number;
		name: string;
		entries: IEmulatorEntry[];
		latestVersion: string | null;
	}

	export interface IEmulatorEntry {
		name: string;
		version: string;
		image: IEmulatorImage;
		provenance: IEmulatorProvenance;
		digest: string;
	}

	export interface IEmulatorImage {
		url: string;
		id: string;
		type: string;
		fstype: string;
	}

	export interface IEmulatorProvenance {
		ociSourceUrl: string;
		versionTag: string;
		layers: string[];
	}

	/* User
	============================================*/

	export interface IEaasiUser {
		id: number;
		email: string;
		firstName: string;
		lastName: string;
		username: string;
		roleId: number;
		createdAt: Date;
		updatedAt: Date;
		lastLogin: Date;
	}

	export interface IEaasiRole {
		id: number;
		roleName: string;
		roleDescription: string;
		createdAt: Date;
		updatedAt: Date;
	}

	export interface IEaasiAuthResponse {
		user: IEaasiUser,
		token: string
	}

}