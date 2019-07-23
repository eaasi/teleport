import {BAD_REQUEST, DELETED, CREATED, NOT_FOUND, OK} from "../../http_helpers";

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
	 * @returns {Promise<void>}
	 */
	async getAll(limit, page, res, sortCol) {
		if(limit == null) {
			limit = this.MAX_GET_ALL_PAGE_SIZE
		}
		await this.model
			.findAndCountAll()
			.then((data) => {
				// Set total pages and offset for pagination
				let total_pages = Math.ceil(data.count / limit);
				let offset = limit * (page - 1);

				return this.model.findAll({
					limit: limit,
					offset: offset,
					$sort: sortCol ? {sortCol: 1} : null
				}).then(results => res.status(OK)
					.send({
						'results': results,
						'count': data.count,
						'total_pages': total_pages
					})
				).catch(error => res.status(BAD_REQUEST)
					.send(error)
				);
			});
	};

	/**
	 * Gets a model instance by PK
	 * @param pk instance primary key
	 * @param res response
	 * @returns {Promise<void>}
	 */
	async getByPk (pk, res) {
		await this.model.findByPk(pk).then(found => {
			if (!found) {
				return res.status(NOT_FOUND).send({
					message: ApiService.notFound()
				});
			}
			return res.json(found);
		});
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
