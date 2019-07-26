/**
 * Test Fake for Sequelize Models
 */
export default class SequelizeModelFake {

	constructor(modelName, fakeResultCount) {
		this.modelName = modelName
		this.resultCount = fakeResultCount || 0
		this.findAndCountAll_callCount = 0;
		this.findAll_callCount = 0;
	}

	async findAndCountAll() {
		this.findAndCountAll_callCount += 1;
		let rows = []

		if (this.resultCount > 0) {
			for (let i=0; i < this.resultCount; i++) {
				rows.push({id: i})
			}
		}

		return await {
			count: this.resultCount,
			rows: rows
		};
	}

	async findAll() {
		this.findAll_callCount += 1;
		return await []
	};
}