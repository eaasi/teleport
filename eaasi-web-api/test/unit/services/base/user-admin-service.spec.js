import { MockCrudService } from '../../../helpers/doubles/mock-crud-service';
import UserAdminService from '../../../../src/services/admin/UserAdminService';
import CrudQuery from '../../../../src/classes/CrudQuery';

describe('UserAdminService', () => {
	// Constructor Tests

	it('on initialization sets a crud service for EaasiUser', () => {
		let mockUserService = new MockCrudService();
		let mockRoleService = new MockCrudService();
		let sut = new UserAdminService(mockUserService, mockRoleService);
		expect(sut._userCrudService).toBe(mockUserService);
	});

	it('on initialization sets a crud service for EaasiRole', () => {
		let mockUserService = new MockCrudService();
		let mockRoleService = new MockCrudService();
		let sut = new UserAdminService(mockUserService, mockRoleService);
		expect(sut._roleCrudService).toBe(mockRoleService);
	});

	it('on getUsers calls getAll on User Service with query', () => {
		let mockUserService = new MockCrudService();
		let mockRoleService = new MockCrudService();
		let sut = new UserAdminService(mockUserService, mockRoleService);
		sut.getUsers({'foo': 'bar'});
		expect(mockUserService.getAllCalledWithQuery).toStrictEqual({'foo': 'bar'});
	});

	it('on getUsers throws if getAll result hasError', async () => {
		let mockUserService = new MockCrudService();
		let mockRoleService = new MockCrudService();
		let sut = new UserAdminService(mockUserService, mockRoleService);
		try {
			await sut.getUsers('FORCE_ERROR');
		} catch(e) {
			expect(e).toBe('you errored, pal');
		}
	});

	it('on getUser calls getByPk on User Service with id', () => {
		let mockUserService = new MockCrudService();
		let mockRoleService = new MockCrudService();
		let sut = new UserAdminService(mockUserService, mockRoleService);
		sut.getUser(-12345);
		expect(mockUserService.getByPkCalledWith).toStrictEqual(-12345);
	});

	it('on getUser throws if getByPk result hasError', async () => {
		let mockUserService = new MockCrudService();
		let mockRoleService = new MockCrudService();
		let sut = new UserAdminService(mockUserService, mockRoleService);
		try {
			await sut.getUser('FORCE_ERROR');
		} catch(e) {
			expect(e).toBe('you errored, pal');
		}
	});

	it('on getUser throws if getByPk result is null', async () => {
		let mockUserService = new MockCrudService();
		let mockRoleService = new MockCrudService();
		let sut = new UserAdminService(mockUserService, mockRoleService);
		try {
			await sut.getUser('FORCE_NULL');
		} catch(e) {
			expect(e).toBe('Cannot find user with id: FORCE_NULL');
		}
	});

	it('on getUserByEmail calls getOneWhere given email', () => {
		let mockUserService = new MockCrudService();
		let mockRoleService = new MockCrudService();
		let sut = new UserAdminService(mockUserService, mockRoleService);
		sut.getUserByEmail('jane@yale.example.edu');
		expect(mockUserService.getOneWhereCalledWith).toStrictEqual({email: 'jane@yale.example.edu'});
	});

	it('on getUserByEmail throws given error from getOneWhere', async () => {
		let mockUserService = new MockCrudService();
		let mockRoleService = new MockCrudService();
		let sut = new UserAdminService(mockUserService, mockRoleService);
		try {
			await sut.getUserByEmail('FORCE_ERROR');
		} catch(e) {
			expect(e).toBe('you errored, pal');
		}
	});

	it('on getUserByEmail throws given getOneWhere responds with null', async () => {
		let mockUserService = new MockCrudService();
		let mockRoleService = new MockCrudService();
		let sut = new UserAdminService(mockUserService, mockRoleService);
		try {
			await sut.getUserByEmail('FORCE_NULL');
		} catch(e) {
			expect(e).toBe('Cannot find user with email: FORCE_NULL');
		}
	});

	it('on saveUser given id calls update with provided id', () => {
		let mockUserService = new MockCrudService();
		let mockRoleService = new MockCrudService();
		let sut = new UserAdminService(mockUserService, mockRoleService);
		sut.saveUser(123, {'name': 'baz'});
		expect(mockUserService.updateCalledWithPk).toStrictEqual(123);
		expect(mockUserService.updateCalledWithModelData).toStrictEqual({'name': 'baz'});
	});

	it('on saveUser given no id calls create with object', () => {
		let mockUserService = new MockCrudService();
		let mockRoleService = new MockCrudService();
		let sut = new UserAdminService(mockUserService, mockRoleService);
		sut.saveUser(null, {'name': 'baz'});
		expect(mockUserService.createCalledWith).toStrictEqual({'name': 'baz'});
	});

	it('on saveUser given error on create / update throws exception', async () => {
		let mockUserService = new MockCrudService();
		let mockRoleService = new MockCrudService();
		let sut = new UserAdminService(mockUserService, mockRoleService);
		try {
			await sut.saveUser('FORCE_ERROR');
		} catch(e) {
			expect(e).toBe('you errored, pal');
		}
	});

	it('on setUserLastLogin callsGetByPk with userId', async () => {
		let mockUserService = new MockCrudService();
		let mockRoleService = new MockCrudService();
		let sut = new UserAdminService(mockUserService, mockRoleService);
		sut.setUserLastLogin(3092309);
		expect(mockUserService.getByPkCalledWith).toStrictEqual(3092309);
	});

	it('on deleteUser provided userId calls destroy with userId', async () => {
		let mockUserService = new MockCrudService();
		let mockRoleService = new MockCrudService();
		let sut = new UserAdminService(mockUserService, mockRoleService);
		sut.deleteUser(9);
		expect(mockUserService.destroyCalledWith).toStrictEqual(9);
	});

	it('on deleteUser given destroy throws error throws error', async () => {
		let mockUserService = new MockCrudService();
		let mockRoleService = new MockCrudService();
		let sut = new UserAdminService(mockUserService, mockRoleService);
		try {
			await sut.deleteUser('FORCE_ERROR');
		} catch(e) {
			expect(e).toBe('you errored, pal');
		}
	});

	it('on getRoles calls getAll with provided query', async () => {
		let mockUserService = new MockCrudService();
		let mockRoleService = new MockCrudService();
		let sut = new UserAdminService(mockUserService, mockRoleService);
		sut.getRoles();
		let query = new CrudQuery();

		query.descending = false;
		query.limit = 10000;
		query.page = 1;
		query.sortCol = undefined;

		expect(mockRoleService.getAllCalledWithQuery).toStrictEqual(query);
	});
});
