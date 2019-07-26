/**
 * Test double for Sequelize Models.
 */
export default class SequelizeModelFake {

	constructor(modelName, fakeResultCount) {
		this.modelName = modelName;
		this.rows = [];
		this.resultCount = fakeResultCount || 0;
		this.findAndCountAll_callCount = 0;
		this.findAll_callCount = 0;

		if (this.resultCount > 0) {
			for (let i=0; i < this.resultCount; i++) {
				this.rows.push({id: i})
			}
		}
	}

	/**
	 * Method fake for SequelizeModel.findAndCountAll
	 * @returns {Promise<void>}
	 */
	async findAndCountAll() {
		this.findAndCountAll_callCount += 1;

		return await {
			count: this.rows.length,
			rows: this.rows
		};
	}

	/**
	 * Method fake for SequelizeModel.findAll
	 * @param options
	 * @returns {Promise<void>}
	 */
	async findAll(options) {
		let limit = options.limit;
		let offset = options.offset;
		let $sort = options.$sort;

		this.rows.sort((a, b) => (a[$sort] > b[$sort]) ? 1 : -1)
		this.findAll_callCount += 1;

		return await this.rows.slice(offset, offset + limit);
	};

	/**
	 * Method fake for SequelizeModel.findByPk
	 * @param pk instance primary key
	 * @returns {Promise<void>}
	 */
	async findByPk(pk) {
		return this.rows.find(obj => {
			return obj.id === pk;
		});
	}
}