/**
 * Test double for Sequelize Models.
 */
export default class SequelizeModelFake {

	constructor(modelName, fakeResultCount) {
		this.modelName = modelName;
		this.rows = [];
		this.resultCount = fakeResultCount || 0;

		if (this.resultCount > 0) {
			for (let i=0; i < this.resultCount; i++) {
				this.rows.push({id: i});
			}
		}

		this.findByPk_calledWith = null;
		this.findByPk_callCount = 0;

		this.findAndCountAll_callCount = 0;
		this.findAll_callCount = 0;
		this.findAll_calledWith = {};

		this.create_callCount = 0;
		this.create_calledWith = {}

		this.update_callCount = 0;
		this.update_calledWith = {}

		this.delete_callCount = 0;
		this.delete_calledWith = {}
	}

	//
	// Find Many
	//

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
		this.findAll_callCount += 1;
		this.findAll_calledWith = options;

		let limit = options.limit;
		let offset = options.offset;
		let $sort = options.$sort;

		this.rows.sort((a, b) => (a[$sort] > b[$sort]) ? 1 : -1)

		return await this.rows.slice(offset, offset + limit);
	};

	//
	// Find One
	//

	/**
	 * Method fake for SequelizeModel.findByPk
	 * @param pk instance primary key
	 * @returns {Promise<void>}
	 */
	async findByPk(pk) {
		this.findByPk_calledWith = pk;
		this.findByPk_callCount += 1;

		return await this.rows.find(obj => {
			return obj.id === pk;
		});
	}

	//
	// Create
	//

	/**
	 * Method fake for SequelizeModel.create
	 * @param fakeData stub
	 * @returns {Promise<void>}
	 */
	async create(fakeData) {
		this.create_callCount += 1;
		this.create_calledWith = fakeData
	}

	//
	// Update
	//

	/**
	 * Method fake for SequelizeModel.create
	 * @param fakeData stub
	 * @returns {Promise<void>}
	 */
	async update(fakePk, fakeData) {
		this.update_callCount += 1;
		this.update_calledWith = [fakePk, fakeData]
	}

	//
	// Delete
	//

	/**
	 * Method fake for SequelizeModel.create
	 * @param fakeData stub
	 * @returns {Promise<void>}
	 */
	async delete(fakePk) {
		this.delete_callCount += 1;
		this.delete_calledWith = fakePk
	}
}