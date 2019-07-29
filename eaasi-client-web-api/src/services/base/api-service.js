export default class ApiService {
	constructor(model) {
		// Sequelize Model
		this.model = model
		this.MAX_GET_ALL_PAGE_SIZE = 100
	}

	setMaxPaginationValue(max_val) {
		this.MAX_GET_ALL_PAGE_SIZE = max_val
	};

	/**
	 * Gets all model instances. Implements pagination
	 * On success, returns object containing results, count, and total pages
	 * On error, returns error object
	 * @param limit number of results to limit in the response
	 * @param page starting page of response results
	 * @param sortCol column by which to sort response results
	 * @param res response
	 * @returns {Promise<{}>}
	 */
	async getAll(limit, page) {

		let resultsCountLimit = limit || this.MAX_GET_ALL_PAGE_SIZE

		let totalResults = await this.model.findAndCountAll()
			.catch(error => {
				return {hasError: true, error: error}
			});

		if (totalResults.hasError) {
			return totalResults
		}

		let total_pages = Math.ceil(totalResults.count / resultsCountLimit);

		let offset = resultsCountLimit * (page - 1);

		let results = await this.model.findAll({
			limit: resultsCountLimit,
			offset: offset,
		}).catch(error => {
			return {hasError: true, error: error}
		});

		if (results.hasError) {
			return results
		}

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
	 * On success, returns model data of found resource
	 * On error, returns error object
	 * @param pk instance primary key
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
	 * On success, returns model data of created resource
	 * On error, returns error object
	 * @param modelData model object
	 * @returns {Promise<{}>}
	 */
	async create(modelData){
		return await this.model.create(modelData)
			.then(created => {
				return { hasError: false, result: created }
			}).catch(error => {
				return {hasError: true, error: error}
			});
	};

	/**
	 * Updates a model instance and persists changes to database
	 * On success, returns model data of updated resource
	 * On error, returns error object
	 * @param pk instance primary key
	 * @param modelData model object
	 * @returns {Promise<{}>}
	 */
	async update(pk, modelData) {
		return await this.model.findByPk(pk)
			.then(found => {
				if (!found) {
					return { hasError: true, error: "notFound" }
				}
				found.update({
					found: modelData
				}).then(() => {
					return { hasError: false, result: found }
				}).catch((error) => {
					return {hasError: true, error: error}
				});
			}).catch((error) => {
				return {hasError: true, error: error}
			});
	};

	/**
	 * Deletes a model instance and persists changes to database
	 * On success, returns PK of deleted resource
	 * On error, returns error object
	 * @param pk instance primary key
	 * @returns {Promise<{}>}
	 */
	async destroy(pk) {
		return await this.model.findByPk(pk)
			.then(found => {
				if (!found) {
					return {hasError: true, error: "notFound" }
				}

				found.destroy({
					where: { pk }
				}).then(() => {
					return { hasError: false, result: pk }
				}).catch(error => {
					return {hasError: true, error: error}
				});
			}).catch(error => {
				return {hasError: true, error: error}
			});
	}
}
