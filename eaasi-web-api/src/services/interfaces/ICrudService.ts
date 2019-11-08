import CrudQuery from '@/services/base/CrudQuery';
import {IPaginatedResult} from '@/types/Crud';
import {WhereOptions} from 'sequelize';
import ICrudServiceResult from './ICrudServiceResult';
import { Model } from 'sequelize-typescript';

/**
 * Behavior of a CRUD Service
 */
export default interface ICrudService<T extends Model> {
	setMaxPaginationValue(maxVal: number): void;
	getAll(query: CrudQuery, raw?: boolean): Promise<ICrudServiceResult<IPaginatedResult<T>>>;
	getByPk(pk: number): Promise<ICrudServiceResult<T>>;
	getAllWhere(where: WhereOptions): Promise<ICrudServiceResult<T>>;
	getOneWhere(where: WhereOptions): Promise<ICrudServiceResult<T>>;
	create(modelData: object): Promise<ICrudServiceResult<T>>;
	update(pk: number, modelData: object): Promise<ICrudServiceResult<T>>;
	destroy(pk: number): Promise<ICrudServiceResult<T>>;
}
