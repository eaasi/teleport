import { IEaasiSearchQuery } from '@/types/resource/Resource';

export class EaasiSearchQuery implements IEaasiSearchQuery {
	page: number = 1;
	limit: number;
	keyword: string;
	sortCol: string = null;
	descending: boolean = false;

	constructor(keyword: string = null, limit: number = 25) {
		this.keyword = keyword;
		this.limit = limit;
	}
}