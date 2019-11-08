import CrudService from '../../../../src/services/base/CrudService';
import SequelizeModelFake from '../../../helpers/doubles/sequelize-model-fake';
import CrudServiceResult from '../../../../src/services/base/CrudServiceResult';
import CrudQuery from '../../../../src/services/base/CrudQuery';

describe('API Service', () => {
	// Constructor Tests

	it('on initialization assigns object model via ctor', () => {
		let modelFake = new SequelizeModelFake('fakeModel');
		let sut = new CrudService(modelFake);
		expect(sut.model).toBe(modelFake);
	});

	// Read Many Objects Tests

	it('on getAll calls findAndCountAll() once', async () => {
		let modelFake = new SequelizeModelFake('fakeModel');
		let sut = new CrudService(modelFake);
		await sut.getAll(10, 1);
		expect(sut.model.findAndCountAll_callCount).toBe(1);
	});

	it('on getAll calls findAll() once', async () => {
		let modelFake = new SequelizeModelFake('fakeModel');
		let sut = new CrudService(modelFake);
		await sut.getAll('foo', 'bar');
		expect(sut.model.findAll_callCount).toBe(1);
	});

	it('on getAll calls findAll() with expected pagination object parameters', async () => {
		let modelFake = new SequelizeModelFake('fakeModel');
		let sut = new CrudService(modelFake);
		let query = new CrudQuery();
		query.page = 3;
		query.limit = 250;
		const expectedOffset = query.limit * (query.page - 1);
		const raw = true;

		await sut.getAll(query, raw);

		// Use toStrictEqual for deep equality comparison
		expect(sut.model.findAll_calledWith).toStrictEqual({
			limit: query.limit,
			offset: expectedOffset,
			raw: raw
		});
	});

	it('on getAll responds with hasError: false with a successful response', async () => {
		let modelFake = new SequelizeModelFake('fakeModel');
		let sut = new CrudService(modelFake);
		const response = await sut.getAll('foo', 'bar');
		expect(response.hasError).toBe(false);
	});

	it('on getAll catches and responds with error if findAll Promise is rejected', async () => {
		let modelFake = new SequelizeModelFake('fakeModel', 10);

		// Force reject the findAll Promise
		const rejectedPromise = Promise.reject('findAll broke');
		modelFake.findAll = () => rejectedPromise;

		let sut = new CrudService(modelFake);
		const response = await sut.getAll(2, 3);

		const expectedError = new CrudServiceResult('findAll broke');

		// Use toStrictEqual for deep equality comparison
		expect(response).toStrictEqual(expectedError);
	});

	it('on getAll catches and responds with error if findAndCountAll Promise is rejected', async () => {
		let modelFake = new SequelizeModelFake('fakeModel', 10);

		// Force reject the findAndCountAll Promise
		const rejectedPromise = Promise.reject('findAndCountAll broke');
		modelFake.findAndCountAll = () => rejectedPromise;

		let sut = new CrudService(modelFake);
		const response = await sut.getAll(2, 3);

		const expectedError = new CrudServiceResult('findAndCountAll broke');

		// Use toStrictEqual for deep equality comparison
		expect(response).toStrictEqual(expectedError);
	});

	// Read Single Object Tests

	it('on getByPk gets a single object by its pk value', async () => {
		let modelFake = new SequelizeModelFake('fakeModel', 3);
		let sut = new CrudService(modelFake);
		const response = await sut.getByPk(2);
		expect(response.result.id).toBe(2);
	});

	it('on getByPk invokes model.findByPk', async () => {
		let modelFake = new SequelizeModelFake('fakeModel', 3);
		let sut = new CrudService(modelFake);
		await sut.getByPk(2);
		expect(modelFake.findByPk_callCount).toBe(1);
	});

	it('on getByPk calls model.findByPk with provided parameter', async () => {
		let modelFake = new SequelizeModelFake('fakeModel', 3);
		let sut = new CrudService(modelFake);
		await sut.getByPk('foo');
		expect(modelFake.findByPk_calledWith).toBe('foo');
	});

	it('on getByPk catches and respond with error if findByPk Promise is rejected', async () => {
		let modelFake = new SequelizeModelFake('fakeModel', 5);

		// Force reject the Promise
		const rejectedPromise = Promise.reject('it broke');
		modelFake.findByPk = () => rejectedPromise;

		let sut = new CrudService(modelFake);
		const response = await sut.getByPk(4);

		const expectedError = new CrudServiceResult('it broke');

		// Use toStrictEqual for deep equality comparison
		expect(response).toStrictEqual(expectedError);
	});

	// Create Object Tests

	it('on create invokes model.create', async () => {
		let modelFake = new SequelizeModelFake('fakeModel', 3);
		let sut = new CrudService(modelFake);
		await sut.create({ foo: 'bar' });
		expect(modelFake.create_callCount).toBe(1);
	});

	it('on create invokes model.create with passed object parameter', async () => {
		let modelFake = new SequelizeModelFake('fakeModel', 3);
		let sut = new CrudService(modelFake);
		let fakeData = { foo: 'bar', baz: 'qux' };
		await sut.create(fakeData);
		expect(modelFake.create_calledWith).toBe(fakeData);
	});

	it('on create catches and responds with error if model.create Promise is rejected', async () => {
		let modelFake = new SequelizeModelFake('fakeModel', 5);

		// Force reject the Promise
		const rejectedPromise = Promise.reject('it broke');
		modelFake.create = () => rejectedPromise;

		let sut = new CrudService(modelFake);
		const response = await sut.create({ fake: 'data' });

		const expectedError = new CrudServiceResult('it broke');

		// Use toStrictEqual for deep equality comparison
		expect(response).toStrictEqual(expectedError);
	});

	// Update Object Tests

	it('on update invokes model.update once', async () => {
		let modelFake = new SequelizeModelFake('fakeModel', 3);
		let sut = new CrudService(modelFake);
		let fakeData = { foo: 'bar', baz: 'qux' };

		// Force the findByPk Promise to resolve to a value
		const foundModel = new SequelizeModelFake('foundModel', 5);
		const foundModelResolution = Promise.resolve(foundModel);
		modelFake.findByPk = () => foundModelResolution;

		await sut.update(5, fakeData);
		expect(foundModel.update_callCount).toBe(1);
	});

	it('on update invokes model.update with provided parameters', async () => {
		let modelFake = new SequelizeModelFake('fakeModel', 3);
		let sut = new CrudService(modelFake);
		let fakeData = { foo: 'bar', baz: 'qux' };

		// Force the findByPk Promise to resolve to a value
		const foundModel = new SequelizeModelFake('foundModel', 1);
		const foundModelResolution = Promise.resolve(foundModel);
		modelFake.findByPk = () => foundModelResolution;

		await sut.update(5, fakeData);
		expect(foundModel.update_calledWith).toStrictEqual(fakeData);
	});

	it('on update first attempts to find an existing object by pk', async () => {
		let modelFake = new SequelizeModelFake('fakeModel', 3);
		let sut = new CrudService(modelFake);
		await sut.update(17, { fake: 'updateData' });
		expect(modelFake.findByPk_calledWith).toBe(17);
	});

	it('on update returns notFound error if PK not found', async () => {
		let modelFake = new SequelizeModelFake('fakeModel', 3);
		let sut = new CrudService(modelFake);

		// Force the findByPk Promise to resolve to undefined
		const emptyObject = Promise.resolve(undefined);
		modelFake.findByPk = () => emptyObject;

		let res = await sut.update(17, { fake: 'updateData' });
		const expectedError = new CrudServiceResult('notFound');

		expect(res).toStrictEqual(expectedError);
	});

	it('on update returns an error if findByPk Promise is rejected', async () => {
		let modelFake = new SequelizeModelFake('fakeModel', 3);
		let sut = new CrudService(modelFake);

		// Force reject the Promise
		const rejectedPromise = Promise.reject('findByPk broke');
		modelFake.findByPk = () => rejectedPromise;

		let res = await sut.update(34, { fake: 'updateData' });

		const expectedError = new CrudServiceResult('findByPk broke');
		expect(res).toStrictEqual(expectedError);
	});

	it('on update returns an error if instance model.update Promise is rejected', async () => {
		let modelFake = new SequelizeModelFake('fakeModel', 3);
		let sut = new CrudService(modelFake);

		// Force the findByPk Promise to resolve to a value
		const foundModel = new SequelizeModelFake('foundModel', 5);
		const foundModelResolution = Promise.resolve(foundModel);
		modelFake.findByPk = () => foundModelResolution;

		// Force reject the update Promise
		const rejectedPromise = Promise.reject('update broke');
		foundModel.update = () => rejectedPromise;

		let res = await sut.update(32, { fake: 'updateData' });
		const expectedError = new CrudServiceResult('update broke');

		expect(res).toStrictEqual(expectedError);
	});

	// Destroy Object Tests

	it('on destroy invokes model.destroy', async () => {
		let modelFake = new SequelizeModelFake('fakeModel', 3);
		let sut = new CrudService(modelFake);

		// Force the findByPk Promise to resolve to a value
		const foundModel = new SequelizeModelFake('foundModel', 5);
		const foundModelResolution = Promise.resolve(foundModel);
		modelFake.findByPk = () => foundModelResolution;

		await sut.destroy(5);
		expect(foundModel.destroy_callCount).toBe(1);
	});

	it('on destroy attempts to find an existing object by pk', async () => {
		let modelFake = new SequelizeModelFake('fakeModel', 3);
		let sut = new CrudService(modelFake);
		await sut.destroy(24);
		expect(modelFake.findByPk_calledWith).toBe(24);
	});

	it('on destroy returns notFound error if pk not found', async () => {
		let modelFake = new SequelizeModelFake('fakeModel', 3);
		let sut = new CrudService(modelFake);

		// Force the findByPk Promise to resolve to undefined
		const emptyObject = Promise.resolve(undefined);
		modelFake.findByPk = () => emptyObject;

		let res = await sut.destroy(17);

		const expectedError = new CrudServiceResult('notFound');
		expect(res).toStrictEqual(expectedError);
	});

	it('on destroy returns an error if destroy Promise is rejected', async () => {
		let modelFake = new SequelizeModelFake('fakeModel', 3);
		let sut = new CrudService(modelFake);

		// Force the findByPk Promise to resolve to a value
		const foundModel = new SequelizeModelFake('foundModel', 5);
		const foundModelResolution = Promise.resolve(foundModel);
		modelFake.findByPk = () => foundModelResolution;

		// Force reject the destroy Promise
		const rejectedPromise = Promise.reject('destroy broke');
		foundModel.destroy = () => rejectedPromise;

		let res = await sut.destroy(98);
		const expectedError = new CrudServiceResult('destroy broke');

		expect(res).toStrictEqual(expectedError);
	});

	it('on destroy returns an error on if findByPk Promise is rejected', async () => {
		let modelFake = new SequelizeModelFake('fakeModel', 3);
		let sut = new CrudService(modelFake);

		// Force reject the Promise
		const rejectedPromise = Promise.reject('findByPk broke');
		modelFake.findByPk = () => rejectedPromise;

		let res = await sut.destroy(34);
		const expectedError = new CrudServiceResult('findByPk broke');

		expect(res).toStrictEqual(expectedError);
	});

	// Pagination Tests

	it('has a default MAX_GET_PAGE_SIZE of 100', () => {
		let modelFake = new SequelizeModelFake('fakeModel');
		let sut = new CrudService(modelFake);
		expect(sut.MAX_GET_ALL_PAGE_SIZE).toBe(100);
	});

	it.each`
        limit  | page | tableSize | expected
        ${0}   | ${0} | ${0}      | ${0}
        ${1}   | ${0} | ${0}      | ${0}
        ${1}   | ${1} | ${0}      | ${0}
        ${1}   | ${1} | ${1}      | ${1}
        ${2}   | ${1} | ${1}      | ${1}
        ${1}   | ${2} | ${1}      | ${0}
        ${100} | ${1} | ${250}    | ${100}
        ${100} | ${2} | ${250}    | ${100}
        ${100} | ${3} | ${250}    | ${50}
    `(
	'returns $expected count given limit: $limit, page: $page, and table size: $tableSize',
	async ({ limit, page, tableSize, expected }) => {
		let modelFake = new SequelizeModelFake('fakeModel', tableSize);
		let sut = new CrudService(modelFake);
		let query = new CrudQuery();
		query.limit = limit;
		query.page = page;
		const response = await sut.getAll(query);
		expect(response.result.count).toBe(expected);
	}
);

	it.each`
        input  | expected
        ${0}   | ${0}
        ${1}   | ${1}
        ${889} | ${889}
        ${-1}  | ${-1}
    `(
	'sets custom MAX_GET_ALL_PAGE_SIZE with input ($input) via instance method',
	({ input, expected }) => {
		let modelFake = new SequelizeModelFake('fakeModel');
		let sut = new CrudService(modelFake);
		sut.setMaxPaginationValue(input);
		expect(sut.MAX_GET_ALL_PAGE_SIZE).toBe(expected);
	}
);
});
