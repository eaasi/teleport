declare module 'eaasi-nav' {

	export interface IAction extends IMenuItem {
		description: string
	}

	export interface IMenuItem {
		icon: string;
		label: string;
		route?: string;
		onClick?(): void;
	}

	export interface IEaasiTab {
		icon?: string,
		label: string
	}
}