/**
 * Test Spy for Sequelize Models
 */
export default class SequelizeModelSpy {

	constructor(modelName) {
		this.modelName = modelName
		this.findAndCountAllWasCalled = false;
		this.findAndCountAll_CallCount = 0;

		this.findAllWasCalled = false;
		this.findAll_CallCount = 0;
	}

	async findAndCountAll() {
		this.findAndCountAllWasCalled = true;
		this.findAndCountAllWasCalled += 1;
		return await {
			count: 42,
			rows: []
		};
	}

	async findAll() {
		this.findAllWasCalled =  true;
		this.findAll_CallCount += 1;
		return await []
	};
}