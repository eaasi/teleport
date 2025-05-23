declare module 'eaasi-admin' {

	/* Emulator
	============================================*/

	export interface IEmulator {
		id?: string;
		name: string;
		entries: IEmulatorEntry[];
		latestVersion: string | null;
	}

	export interface IEmulatorEntry {
		id: string;
		name: string;
		version: string;
		image: IEmulatorImage;
		provenance: IEmulatorProvenance;
		digest: string;
		tags?: string[];
	}

	export interface IEmulatorImage {
		category: string;
		id: string;
		kind: string;
		fstype: string;
	}

	export interface IEmulatorProvenance {
		url: string;
		tag: string;
	}

	/* User
	============================================*/

	export interface IEaasiUser {
		id: string;
		email: string;
		firstName: string;
		lastName: string;
		username: string;
		roleId: number;
		createdAt: Date;
		updatedAt: Date;
		lastLogin: Date;
		copy(): IEaasiUser;
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

	export interface IKeyboardSettings {
		language: IKeyboardLanguage;
		layout: IKeyboardLayout;
	}

	export interface IKeyboardLayout {
		descriptions: string;
		name: string;
		vendor: string;
	}

	export interface IKeyboardLanguage {
		descriptions: string;
		name: string;
	}

	export interface IKeycloakUserInfo {
		id: string;
		username: string;
		firstName?: string;
		lastName?: string;
		email?: string;
		attributes?: {
			role: string[]
		};
		realmRoles?: string[];
		tid?: string;
		orgname?: string;
	}

	export interface IKeycloakGroup {
		id: string;
		name: string;
		path: string;
	}

}