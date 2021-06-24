export interface ILabeledItem {
	label: string,
	value: any
}

export interface ILabeledEditableItem extends ILabeledItem {
	readonly: boolean;
	editType: EditType;
	changed?: boolean;
	property?: string;
	data?: any;
}

export interface ILabeledItemGroup {
	items: ILabeledItem[];
	title: string;
}

export type EditType = 'text-input' | 'configured-drives' | 'checkbox' | 'text-area' | 'select' | 'date' | 'custom';