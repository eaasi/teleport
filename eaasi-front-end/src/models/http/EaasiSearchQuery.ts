import { IEaasiSearchQuery } from '@/types/Search';

export default class EaasiSearchQuery implements IEaasiSearchQuery {
	page: number = 1;
	limit: number = 50;
	keyword?: string = null;
	sortCol?: string = null;
	descending: boolean = false;
}
