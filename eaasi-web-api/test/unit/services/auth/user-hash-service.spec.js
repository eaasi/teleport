import { MockCrudService } from '../../../helpers/doubles/mock-crud-service';
import UserHashService from '../../../../src/services/auth/UserHashService';

describe('UserHashService', () => {
	// Constructor Tests

	it('on initialization sets a crud service for EaasiUserHash', () => {
		let mockUserHashService = new MockCrudService();
		let sut = new UserHashService(mockUserHashService);
		expect(sut._userHashCrudService).toBe(mockUserHashService);
	});

	it('on getUserHash calls getByPk on UserHashService with id', () => {
		let mockUserHashService = new MockCrudService();
		let sut = new UserHashService(mockUserHashService);
		sut.getUserHash(12345);
		expect(mockUserHashService.getByPkCalledWith).toStrictEqual(12345);
	});

	it('on getUserHash throws if getByPk result hasError', async () => {
		let mockUserHashService = new MockCrudService();
		let sut = new UserHashService(mockUserHashService);
		try {
			await sut.getUserHash('FORCE_ERROR');
		} catch(e) {
			expect(e).toBe('you errored, pal');
		}
	});

	it('on getUserHash throws if getByPk result is null', async () => {
		let mockUserHashService = new MockCrudService();
		let sut = new UserHashService(mockUserHashService);
		try {
			await sut.getUserHash('FORCE_NULL');
		} catch(e) {
			expect(e).toBe('Cannot find user with id: FORCE_NULL');
		}
	});

	it('on saveUserHash given id calls update with provided id', () => {
		let mockUserHashService = new MockCrudService();
		let sut = new UserHashService(mockUserHashService);
		const userId = 123;
		const hash = 'some hash';
		sut.saveUserHash({ userId, hash});
		expect(mockUserHashService.getByPkCalledWith).toStrictEqual(123);
		expect(mockUserHashService.updateCalledWithModelData).toStrictEqual({ });
	});

	it('on saveUserHash given error on create / update throws exception', async () => {
		let mockUserHashService = new MockCrudService();
		let sut = new UserHashService(mockUserHashService);
		try {
			await sut.saveUserHash('FORCE_ERROR');
		} catch(e) {
			expect(e).toBe('you errored, pal');
		}
	});

	it('on saveUser given no id calls create with object', () => {
		try {
			let mockUserHashService = new MockCrudService();
			let sut = new UserHashService(mockUserHashService);
			sut.saveUserHash({ userId: null, hash: 'some hash'});
		} catch(e) {
			expect(e).toBe('user id is required');
		}
	});

	it('on deleteUserHash provided userId calls destroy with userId', async () => {
		let mockUserHashService = new MockCrudService();
		let sut = new UserHashService(mockUserHashService);
		sut.deleteUserHash(9);
		expect(mockUserHashService.destroyCalledWith).toStrictEqual(9);
	});

	it('on deleteUserHash given destroy throws error throws error', async () => {
		let mockUserHashService = new MockCrudService();
		let sut = new UserHashService(mockUserHashService);
		try {
			await sut.deleteUserHash('FORCE_ERROR');
		} catch(e) {
			expect(e).toBe('you errored, pal');
		}
	});
	
});
