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

	/**
	 * Gets all model instances. Implements pagination
	 * @param limit number of results to limit in the response
	 * @param page starting page of response results
	 * @param sortCol column by which to sort response results
	 * @param res response
	 * @returns {Promise<{}>}
	 */
	async getAll(limit, page, sortCol) {

		let resultsCountLimit = limit || this.MAX_GET_ALL_PAGE_SIZE

		let totalResults = await this.model.findAndCountAll()
			.catch(error => {
				return {hasError: true, error: error}
			});

		let total_pages = Math.ceil(totalResults.count / resultsCountLimit);

		let offset = resultsCountLimit * (page - 1);

		let results = await this.model.findAll({
			limit: resultsCountLimit,
			offset: offset,
			$sort: sortCol ? {sortCol: 1} : null
		}).catch(error => {
			return {hasError: true, error: error}
		});

		return {
			hasError: false,
			result: {
				'result': results,
				'count': results.length,
				'total_pages': total_pages
			}
		}
	};

	/**
	 * Gets a model instance by PK
	 * @param pk instance primary key
	 * @param res response
	 * @returns {Promise<{}>}
	 */
	async getByPk (pk) {
		return await this.model.findByPk(pk)
			.then(result => {
				return { hasError: false, result: result }
			}).catch(error => {
				return { hasError: true, error: error }
			});
	};

	/**
	 * Creates a model instance and persists to database
	 * @param modelData model object
	 * @returns {Promise<{}>}
	 */
	async create(modelData){
		return await this.model.create(modelData)
			.then(created => {
				return {
					hasError: false,
					result: created
				}
			}).catch(error => {
				return {hasError: true, error: error}
			});
	};

	/**
	 * Updates a model instance and persists changes to database
	 * @param pk instance primary key
	 * @param modelData model object
	 * @param res response
	 * @returns {Promise<{}>}
	 */
	async update(pk, modelData) {
		await this.model.findByPk(id).then(found => {
			if (!found) {
				return null
			}

			found.update({
				found: modelData
			}).then(() => {
				return found
			}).catch((error) => {
				res.status(BAD_REQUEST).send(error)
			});
		}).catch((error) => {
			res.status(BAD_REQUEST).send(error)
		});
	};

	/**
	 * Deletes a model instance and persists changes to database
	 * @param pk instance primary key
	 * @param res response
	 * @returns {Promise<{}>}
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
