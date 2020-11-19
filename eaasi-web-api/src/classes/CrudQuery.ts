import { WhereOptions } from 'sequelize/types';

export default class CrudQuery {
	page: number;
	limit: number;
	sortCol?: string;
	descending: boolean;
	where?: WhereOptions;

	constructor() {
		this.page = 1;
		this.limit = 25;
		this.descending = false;
	}
}