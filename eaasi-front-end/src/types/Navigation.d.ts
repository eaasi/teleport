declare module 'eaasi-nav' {

	export interface IAction extends IMenuItem {
		description: string
		isEnabled: boolean
	}

	export interface IMenuItem {
		shortName?: string;
		icon: string;
		label: string;
		route?: string;
		onClick?(): void;
	}

	export interface IEaasiTab {
		icon?: string;
		label: string;
		disabled?: boolean;
	}
}