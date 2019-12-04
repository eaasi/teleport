/**
 * HSequelizeModelFakeSequelizeModelFakePService SequelizeModelFakeest Mock
 */
import CrudQuery from '@/services/base/CrudQuery';
import ICrudService from '@/services/interfaces/ICrudService';
import ICrudServiceResult from '@/services/interfaces/ICrudServiceResult';
import {IPaginatedResult} from '@/types/Crud';
import {AndOperator, OrOperator, where, WhereAttributeHash} from 'sequelize';
import {Model} from 'sequelize-typescript';
import {Literal, Where} from 'sequelize/types/lib/utils';
import SequelizeModelFake from './sequelize-model-fake';

export class MockCrudService implements ICrudService<Model> {
	createCalledWith = {};
	destroyCalledWith = 0;
	getAllCalledWithQuery = {};
	getAllCalledWithRaw = false;
	getAllWhereCalledWith = {};
	getByPkCalledWith = 0;
	getOneWhereCalledWith = {};
	setMaxPaginationValueCalledWith = 0;
	updateCalledWithPk = 0;
	updateCalledWithModelData = {};

	ERROR_SENTINEL = 'FORCE_ERROR';
	NULL_SENTINTEL = 'FORCE_NULL';

	ERROR_RESULT = {
		hasError: true,
		error: 'you errored, pal'
	};

	NULL_RESULT = {
		hasError: false,
		result: null
	};

	constructor() {
	}

	//@ts-ignore
	create(modelData: object): Promise<ICrudServiceResult<SequelizeModelFake>> {
		this.createCalledWith = modelData;
		//@ts-ignore
		if (modelData === this.ERROR_SENTINEL) {
			//@ts-ignore
			return this.ERROR_RESULT;
		}
		//@ts-ignore
		if (modelData === this.NULL_SENTINTEL) {
			//@ts-ignore
			return this.NULL_RESULT;
		}
		return {
			//@ts-ignore
			hasError: false
		}
	}

	//@ts-ignore
	destroy(pk: number): Promise<ICrudServiceResult<SequelizeModelFake>> {
		this.destroyCalledWith = pk;
		//@ts-ignore
		if (pk === this.ERROR_SENTINEL) {
			//@ts-ignore
			return this.ERROR_RESULT;
		}
		//@ts-ignore
		if (pk === this.NULL_SENTINTEL) {
			//@ts-ignore
			return this.NULL_RESULT;
		}
		return {
			//@ts-ignore
			hasError: false
		}
	}

	//@ts-ignore
	getAll(query: CrudQuery, raw?: boolean): Promise<ICrudServiceResult<IPaginatedResult<Model>>> {
		this.getAllCalledWithQuery = query;
		this.getAllCalledWithRaw = raw;
		//@ts-ignore
		if (query === this.ERROR_SENTINEL) {
			//@ts-ignore
			return this.ERROR_RESULT;
		}
		return {
			//@ts-ignore
			hasError: false
		}
	}

	//@ts-ignore
	getAllWhere(where: WhereAttributeHash | AndOperator | OrOperator | Literal | Where): Promise<ICrudServiceResult<SequelizeModelFake>> {
		this.getAllWhereCalledWith = where;
		//@ts-ignore
		if (where === this.ERROR_SENTINEL) {
			//@ts-ignore
			return this.ERROR_RESULT;
		}
		return {
			//@ts-ignore
			hasError: false
		}
	}

	//@ts-ignore
	async getByPk(pk: number): Promise<ICrudServiceResult<SequelizeModelFake>> {
		this.getByPkCalledWith = pk;
		//@ts-ignore
		if (pk === this.ERROR_SENTINEL) {
			//@ts-ignore
			return this.ERROR_RESULT;
		}
		//@ts-ignore
		if (pk === this.NULL_SENTINTEL) {
			//@ts-ignore
			return this.NULL_RESULT;
		}
		return {
			//@ts-ignore
			hasError: false
		}
	}

	//@ts-ignore
	getOneWhere(where: WhereAttributeHash | AndOperator | OrOperator | Literal | Where): Promise<ICrudServiceResult<SequelizeModelFake>> {
		this.getOneWhereCalledWith = where;
		//@ts-ignore
		if (where === this.ERROR_SENTINEL || where.email === this.ERROR_SENTINEL) {
			//@ts-ignore
			return this.ERROR_RESULT;
		}
		//@ts-ignore
		if (where === this.NULL_SENTINTEL || where.email === this.NULL_SENTINTEL) {
			//@ts-ignore
			return this.NULL_RESULT;
		}
		return {
			//@ts-ignore
			hasError: false
		}
	}

	//@ts-ignore
	setMaxPaginationValue(maxVal: number): void {
		this.setMaxPaginationValueCalledWith = maxVal;
		//@ts-ignore
		if (where === this.ERROR_SENTINEL) {
			//@ts-ignore
			return this.ERROR_RESULT;
		}
		//@ts-ignore
		if (where === this.NULL_SENTINTEL) {
			//@ts-ignore
			return this.NULL_RESULT;
		}
		//@ts-ignore
		return {
			//@ts-ignore
			hasError: false
		}
	}

	//@ts-ignore
	update(pk: number, modelData: object): Promise<ICrudServiceResult<SequelizeModelFake>> {
		this.updateCalledWithPk = pk;
		this.updateCalledWithModelData = modelData;
		//@ts-ignore
		if (pk === this.ERROR_SENTINEL || modelData === this.ERROR_SENTINEL) {
			//@ts-ignore
			return this.ERROR_RESULT;
		}
		//@ts-ignore
		if (pk === this.NULL_SENTINTEL || modelData === this.NULL_SENTINTEL) {
			//@ts-ignore
			return this.NULL_RESULT;
		}
		return {
			//@ts-ignore
			hasError: false
		}
	}
}
