/**
 * Test Fake for Sequelize Models
 */
export default class SequelizeModelFake {

	constructor(modelName, fakeResultCount) {
		this.modelName = modelName
		this.rows = []
		this.resultCount = fakeResultCount || 0
		this.findAndCountAll_callCount = 0;
		this.findAll_callCount = 0;

		if (this.resultCount > 0) {
			for (let i=0; i < this.resultCount; i++) {
				this.rows.push({id: i})
			}
		}
	}

	async findAndCountAll() {
		this.findAndCountAll_callCount += 1;

		return await {
			count: this.rows.length,
			rows: this.rows
		};
	}

	async findAll() {
		this.findAll_callCount += 1;
		return await this.rows
	};
}