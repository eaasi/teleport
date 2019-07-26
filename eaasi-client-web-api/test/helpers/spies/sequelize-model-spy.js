/**
 * Test Spy for Sequelize Models
 */
export default class SequelizeModelSpy {

	constructor(modelName) {
		this.modelName = modelName
		this.findAndCountAll_wasCalled = false;
		this.findAndCountAll_callCount = 0;

		this.findAll_wasCalled = false;
		this.findAll_callCount = 0;
	}

	async findAndCountAll() {
		this.findAndCountAll_wasCalled = true;
		this.findAndCountAll_callCount += 1;
		return await {
			count: 42,
			rows: []
		};
	}

	async findAll() {
		this.findAll_wasCalled =  true;
		this.findAll_callCount += 1;
		return await []
	};
}