import CrudQuery from '@/services/base/CrudQuery';
import {WhereOptions} from 'sequelize';
import ICrudServiceResult from './ICrudServiceResult';

/**
 * Behavior of a CRUD Service
 */
export default interface ICrudService {
	setMaxPaginationValue(maxVal: number): void;
	getAll(query: CrudQuery): Promise<ICrudServiceResult>;
	getByPk(pk: number): Promise<ICrudServiceResult>;
	getAllWhere(where: WhereOptions): Promise<ICrudServiceResult>;
	getOneWhere(where: WhereOptions): Promise<ICrudServiceResult>;
	create(modelData: object): Promise<ICrudServiceResult>;
	update(pk: number, modelData: object): Promise<ICrudServiceResult>;
	destroy(pk: number): Promise<ICrudServiceResult>;
}
