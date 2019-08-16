import { IEaasiSearchQuery } from 'eaasi-http';

export default class EaasiSearchQuery implements IEaasiSearchQuery {
	page: number = 1;
	limit: number = 50;
	keyword?: string = null;
	sortCol?: string = null;
	descending: boolean = false;
}
