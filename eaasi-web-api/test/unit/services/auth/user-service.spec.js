import { MockCrudService } from '../../../helpers/doubles/mock-crud-service';
import UserService from '../../../../src/services/user/UserService';
import CrudQuery from '../../../../src/services/base/CrudQuery';

describe('UserService', () => {
	// Constructor Tests

	it('on initialization sets a crud service for EaasiUser', () => {
		let mockUserService = new MockCrudService();
		let sut = new UserService(mockUserService);
		expect(sut._userCrudService).toBe(mockUserService);
	});

	it('on getUserByEmail throws if getUserByEmail result hasError', async () => {
		let mockUserService = new MockCrudService();
		let sut = new UserService(mockUserService);
		try {
			await sut.getUserByEmail('FORCE_ERROR');
		} catch(e) {
			expect(e).toBe('you errored, pal');
		}
	});

	it('on getUser calls getByPk on User Service with id', () => {
		let mockUserService = new MockCrudService();
		let sut = new UserService(mockUserService);
		sut.getUser(-12345);
		expect(mockUserService.getByPkCalledWith).toStrictEqual(-12345);
	});

	it('on getUser throws if getByPk result hasError', async () => {
		let mockUserService = new MockCrudService();
		let sut = new UserService(mockUserService);
		try {
			await sut.getUser('FORCE_ERROR');
		} catch(e) {
			expect(e).toBe('you errored, pal');
		}
	});

	it('on getUser throws if getByPk result is null', async () => {
		let mockUserService = new MockCrudService();
		let sut = new UserService(mockUserService);
		try {
			await sut.getUser('FORCE_NULL');
		} catch(e) {
			expect(e).toBe('Cannot find user with id: FORCE_NULL');
		}
	});

	it('on getUserByEmail calls getOneWhere given email', () => {
		let mockUserService = new MockCrudService();
		let sut = new UserService(mockUserService);
		sut.getUserByEmail('jane@yale.example.edu');
		expect(mockUserService.getOneWhereCalledWith).toStrictEqual({email: 'jane@yale.example.edu'});
	});

	it('on getUserByEmail throws given error from getOneWhere', async () => {
		let mockUserService = new MockCrudService();
		let sut = new UserService(mockUserService);
		try {
			await sut.getUserByEmail('FORCE_ERROR');
		} catch(e) {
			expect(e).toBe('you errored, pal');
		}
	});

	it('on getUserByEmail throws given getOneWhere responds with null', async () => {
		let mockUserService = new MockCrudService();
		let sut = new UserService(mockUserService);
		try {
			await sut.getUserByEmail('FORCE_NULL');
		} catch(e) {
			expect(e).toBe('Cannot find user with email: FORCE_NULL');
		}
	});
});
