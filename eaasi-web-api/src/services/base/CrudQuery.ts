export default class CrudQuery {
	page: number;
	limit: number;
	sortCol?: string;
	descending: boolean;

	constructor() {
		this.page = 1;
		this.limit = 25;
		this.descending = false;
	}
}