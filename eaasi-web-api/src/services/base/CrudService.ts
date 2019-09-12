import Sequelize, {WhereOptions} from 'sequelize';
import ICrudService from '../interfaces/ICrudService';
import ICrudServiceResult from '../interfaces/ICrudServiceResult';
import CrudServiceResult from './CrudServiceResult';
import CrudQuery from '@/services/base/CrudQuery';
import BaseService from './BaseService';

export default class CrudService extends BaseService implements ICrudService {

	protected MAX_GET_ALL_PAGE_SIZE: number;
	protected model: any;

	constructor(model: any) {
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
	async getAll(query: CrudQuery): Promise<ICrudServiceResult> {

		let totalResults = await this.model.findAndCountAll()
    		.catch((error: string) => {
				this._logger.log.error(error);
				return new CrudServiceResult(error);
    		});

		if (totalResults.hasError) {
			return totalResults;
    	}

		let options = this.createFindAllOptions(query);

    	let results = await this.model
			.findAll(options)
    		.catch((error: string) => {
				this._logger.log.error(error);
				return new CrudServiceResult(error);
    		});

		if (results.hasError) {
    		return results;
    	}

		return new CrudServiceResult(null, {
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
	async getByPk(pk: number): Promise<ICrudServiceResult> {
		return await this.model
    		.findByPk(pk)
			.then((result: object) => {
    			return new CrudServiceResult(null, result);
    		})
    		.catch((error: string) => {
				this._logger.log.error(error);
    			return new CrudServiceResult(error);
    		});
	}

	/**
	 * Gets all instances matching whereOptions
	 * Accepts Sequelize WhereOptions to query a matched object
	 * @param whereOptions
	 */
	async getAllWhere(whereOptions: WhereOptions): Promise<ICrudServiceResult> {
		return await this.model.findAll({
			where: whereOptions
		}).then((result: object[]) => {
			return new CrudServiceResult(null, result);
		}).catch((error: string) => {
			this._logger.log.error(error);
			return new CrudServiceResult(error);
		})
	}

	/**
	 * Gets first instance matching whereOptions
	 * Accepts Sequelize WhereOptions to query a matched object
	 * @param whereOptions
	 */
	async getOneWhere(whereOptions: WhereOptions): Promise<ICrudServiceResult> {
		return await this.model.findOne({
			where: whereOptions
		}).then((result: object) => {
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
	async create(modelData: object): Promise<ICrudServiceResult> {
    	return await this.model
			.create(modelData)
    		.then((created: object) => {
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
	async update(pk: number, modelData: any): Promise<ICrudServiceResult> {
		// TODO: Pull the pk off of the modelData
    	return await this.model
			.findByPk(pk)
    		.then((found: Sequelize.Model) => {
    			if (!found) {
					return new CrudServiceResult('notFound');
    			}
    			return found
    				.update(modelData)
					.then(() => {
						found.save();
						return new CrudServiceResult(null, found);
    				})
					.catch((error: string) => {
						this._logger.log.error(error);
    					return new CrudServiceResult(error);
					});
			})
			.catch((error: string) => {
				this._logger.log.error(error);
				return new CrudServiceResult(error);
    		});
	}

	/**
     * Deletes a model instance and persists changes to database
     * On success, returns PK of deleted resource
     * On error, returns error object
     * @param pk instance primary key
     * @returns {Promise<{}>}
     */
	async destroy(pk: number): Promise<ICrudServiceResult> {
		return await this.model
    		.findByPk(pk)
			.then((found: Sequelize.Model) => {
				if (!found) {
    				return new CrudServiceResult('notFound');
				}
				return found.destroy()
					.then(() => {
						return new CrudServiceResult(null, pk);
    				})
					.catch((error: string) => {
						this._logger.log.error(error);
						return new CrudServiceResult(error);
					});
			})
			.catch((error: string) => {
				this._logger.log.error(error);
				return new CrudServiceResult(error);
    		});
	}

	private createFindAllOptions(query: CrudQuery) {
		let limit = query.limit || this.MAX_GET_ALL_PAGE_SIZE;
    	let offset = query.limit * (query.page - 1);
    	let options = { limit, offset } as any;

    	if (!query.sortCol) return options;

		options.order = [
			[query.sortCol, query.descending ? 'DESC' : 'ASC']
    	];

    	return options;
	}

}
