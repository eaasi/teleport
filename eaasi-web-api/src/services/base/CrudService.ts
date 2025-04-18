import CrudQuery from '@/classes/CrudQuery';
import { IPaginatedResult } from '@/types/Crud';
import { WhereOptions } from 'sequelize';
import { Model } from 'sequelize-typescript';
import ICrudService from '../interfaces/ICrudService';
import ICrudServiceResult from '../interfaces/ICrudServiceResult';
import BaseService from './BaseService';
import CrudServiceResult from './CrudServiceResult';

export default class CrudService<T extends Model> extends BaseService implements ICrudService<T> {

	protected MAX_GET_ALL_PAGE_SIZE: number;
	protected model: any;

	constructor(model: new () => T) {
		super();
		this.model = model;
    	this.MAX_GET_ALL_PAGE_SIZE = 100;
	}

	/**
     * Sets the upper bound on number of results to return per page when getAll is invoked
     * without an explicit limit.
     * @param max_val
     */
	setMaxPaginationValue(max_val: number) {
		this.MAX_GET_ALL_PAGE_SIZE = max_val;
	}

	/**
	 * Gets all model instances. Implements pagination
	 * On success, returns object containing results, count, and total pages
	 * On error, returns error object
	 * @returns {Promise<{}>}
	 * @param query CRUD query with pagination parameters
	 */
	async getAll(query: CrudQuery, raw: boolean = false): Promise<ICrudServiceResult<IPaginatedResult<T>>> {

		let totalResults = await this.model.findAndCountAll(query)
    		.catch((error: string) => {
				this._logger.log.error(error);
				return new CrudServiceResult<IPaginatedResult<T>>(error);
    		});

		if (totalResults.hasError) {
			return totalResults;
    	}

		let options = this.createFindAllOptions(query, raw);

    	let results = await this.model.findAll(options);

		if (results.hasError) {
    		return results;
		}

		return new CrudServiceResult<IPaginatedResult<T>>(null, {
    		result: results,
			count: results.length,
			totalResults: totalResults.count
		});
	};

	/**
     * Gets a model instance by PK
     * On success, returns model data of found resource
     * On error, returns error object
     * @param pk instance primary key
     * @returns {Promise<{}>}
     */
	async getByPk(pk: string | number): Promise<ICrudServiceResult<T>> {
		return await this.model
    		.findByPk(pk)
			.then((result: T) => {
    			return new CrudServiceResult<T>(null, result);
    		})
    		.catch((error: string) => {
				this._logger.log.error(error);
    			return new CrudServiceResult<T>(error);
    		});
	}

	/**
	 * Gets all instances matching whereOptions
	 * Accepts Sequelize WhereOptions to query a matched object
	 * @param whereOptions
	 */
	async getAllWhere(whereOptions: WhereOptions): Promise<ICrudServiceResult<T[]>> {
		return await this.model.findAll({
			where: whereOptions
		}).then((result: T[]) => {
			return new CrudServiceResult<T[]>(null, result);
		}).catch((error: string) => {
			this._logger.log.error(error);
			return new CrudServiceResult<T>(error);
		})
	}

	/**
	 * Gets first instance matching whereOptions
	 * Accepts Sequelize WhereOptions to query a matched object
	 * @param whereOptions
	 */
	async getOneWhere(whereOptions: WhereOptions): Promise<ICrudServiceResult<T>> {
		return await this.model.findOne({
			where: whereOptions
		}).then((result: T) => {
			return new CrudServiceResult(null, result);
		}).catch((error: string) => {
			this._logger.log.error(error);
			return new CrudServiceResult(error);
		})
	}

	/**
     * Creates a model instance and persists to database
     * On success, returns model data of created resource
     * On error, returns error object
     * @param modelData model object
     * @returns {Promise<{}>}
     */
	async create(modelData: object): Promise<ICrudServiceResult<T>> {
    	return await this.model
			.create(modelData)
    		.then((created: T) => {
				return new CrudServiceResult(null, created);
			})
    		.catch((error: string) => {
				this._logger.log.error(error);
    			return new CrudServiceResult(error);
			});
	}

	/**
     * Updates a model instance and persists changes to database
     * On success, returns model data of updated resource
     * On error, returns error object
     * @param pk instance primary key
     * @param modelData model object
     * @returns {Promise<{}>}
     */
	async update(pk: string | number, modelData: any): Promise<ICrudServiceResult<T>> {
		// TODO: Pull the pk off of the modelData
    	return await this.model
			.findByPk(pk)
    		.then((found: T) => {
    			if (!found) {
					return new CrudServiceResult('notFound');
    			}
    			return found
    				.update(modelData)
					.then(() => {
						found.save();
						return new CrudServiceResult<T>(null, found);
    				})
					.catch((error: string) => {
						this._logger.log.error(error);
    					return new CrudServiceResult<T>(error);
					});
			})
			.catch((error: string) => {
				this._logger.log.error(error);
				return new CrudServiceResult<T>(error);
    		});
	}

	/**
     * Deletes a model instance and persists changes to database
     * On success, returns PK of deleted resource
     * On error, returns error object
     * @param pk instance primary key
     * @returns {Promise<{}>}
     */
	async destroy(pk: string | number): Promise<ICrudServiceResult<T>> {
		return await this.model
    		.findByPk(pk)
			.then((found: T) => {
				if (!found) {
    				return new CrudServiceResult('notFound');
				}
				return found.destroy()
					.then(() => {
						return new CrudServiceResult<string | number>(null, pk);
    				})
					.catch((error: string) => {
						this._logger.log.error(error);
						return new CrudServiceResult<T>(error);
					});
			})
			.catch((error: string) => {
				this._logger.log.error(error);
				return new CrudServiceResult<T>(error);
    		});
	}

	async destroyAllWhere(where: WhereOptions): Promise< ICrudServiceResult<T>> {
		return await this.model.destroy({ where })
			.then((result: T) => {
				return new CrudServiceResult<T>(null, result);
			})
			.catch((error: string) => {
				this._logger.log.error(error);
				return new CrudServiceResult<T>(error);
			});
	}

	protected createFindAllOptions(query: CrudQuery, raw: boolean = false){
		let limit = query.limit || this.MAX_GET_ALL_PAGE_SIZE;
    	let offset = query.limit * (query.page - 1) || 0;
    	let options = {
			limit,
			offset,
			raw,
			order: undefined,
			where: query.where
		};

    	if (!query.sortCol) return options;

		options.order = [
			[query.sortCol, query.descending ? 'DESC' : 'ASC']
    	];

    	return options;
	}

}
