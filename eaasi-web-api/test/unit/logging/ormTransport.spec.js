import OrmTransport from '../../../src/logging/ormTransport';
import SequelizeModelFake from '../../helpers/doubles/sequelize-model-fake';

describe('ORM Log Transport', () => {

	it('on initialization sets model', () => {
		let modelSpy = new SequelizeModelFake();
		let sut = new OrmTransport(modelSpy);
		expect(sut.model).toBe(modelSpy);
	});

	it('does not call create on log model when constructed', () => {
		let modelSpy = new SequelizeModelFake();
		let sut = new OrmTransport(modelSpy);
		expect(sut.model.create_callCount).toBe(0);
	});

	it('calls create on log model when log function is invoked', async () => {
		let modelSpy = new SequelizeModelFake();
		let sut = new OrmTransport(modelSpy);
		await sut.log('hello', null);
		expect(sut.model.create_callCount).toBe(1);
	});
});
