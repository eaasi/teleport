import {BAD_REQUEST, DELETED, CREATED, NOT_FOUND, OK} from "../../utils/http_helpers";

export default class ApiService {
	constructor(model) {
		// Sequelize Model
		this.model = model
		this.MAX_GET_ALL_PAGE_SIZE = 100
	}

	async setMaxPaginationValue(max_val) {
		this.MAX_GET_ALL_PAGE_SIZE = max_val
	};

	async notFound() {
		await "The request returned no results."
	};

	/**
	 * Gets all model instances. Implements pagination
	 * @param limit number of results to limit in the response
	 * @param page starting page of response results
	 * @param sortCol column by which to sort response results
	 * @param res response
	 * @returns {Promise<{}>}
	 */
	async getAll(limit, page, sortCol) {
		if(limit == null) {
			limit = this.MAX_GET_ALL_PAGE_SIZE
		}

		let totalResults = await this.model.findAndCountAll()
		let total_pages = Math.ceil(totalResults.count / limit);
		let offset = limit * (page - 1);

		let results = await this.model.findAll({
			limit: limit,
			offset: offset,
			$sort: sortCol ? {sortCol: 1} : null
		})

		return {
			'result': results,
			'count': results.count,
			'total_pages': total_pages
		}
	};

	/**
	 * Gets a model instance by PK
	 * @param pk instance primary key
	 * @param res response
	 * @returns {Promise<{}>}
	 */
	async getByPk (pk) {
		return await this.model.findByPk(pk);
	};

	/**
	 * Creates a model instance and persists to database
	 * @param modelData model object
	 * @param res response
	 * @returns {Promise<void>}
	 */
	async create(modelData, res){
		await this.model.create(modelData).then(created =>
			res.status(CREATED).send(created)
		);
	};

	/**
	 * Updates a model instance and persists changes to database
	 * @param pk instance primary key
	 * @param modelData model object
	 * @param res response
	 * @returns {Promise<void>}
	 */
	async update(pk, modelData, res) {
		await this.model.findByPk(id).then(found => {
			if (!found) {
				res.status(NOT_FOUND).send({
					message: ApiService.notFound()
				});
			}
			found.update({
				found: modelData
			}).then(() => res.status(OK).send(found))
				.catch((error) => res.status(BAD_REQUEST).send(error));
		}).catch((error) => res.status(BAD_REQUEST).send(error));
	};

	/**
	 * Deletes a model instance and persists changes to database
	 * @param pk instance primary key
	 * @param res response
	 * @returns {Promise<void>}
	 */
	async destroy(pk, res) {
		await this.model.findByPk(pk).then(found => {
			if (!found) {
				res.status(NOT_FOUND).send({
					message: ApiService.notFound()
				});
			}
			found.destroy({
				where: { pk }
			}).then(() => res.status(DELETED).send())
				.catch(error => res.status(BAD_REQUEST).send(error));
		}).catch(error => res.status(BAD_REQUEST).send(error));
	}
}
