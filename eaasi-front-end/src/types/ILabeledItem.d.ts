export interface ILabeledItem {
	label: string,
	value: string | number | boolean
}

export interface ILabeledEditableItem extends ILabeledItem {
	editable: boolean;
	editType: EditType;
	changed: boolean;
}

export type EditType = 'text-input' | 'configured-drives' | 'checkbox';