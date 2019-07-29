import ApiService from "../../../../src/services/base/api-service";
import SequelizeModelFake from "../../../helpers/doubles/sequelize-model-fake"


describe("API Service", () => {

	// Constructor Tests

	it("on initialization assigns object model via ctor",
		() => {
			let modelFake = new SequelizeModelFake("fakeModel");
			let sut = new ApiService(modelFake);
			expect(sut.model).toBeInstanceOf(SequelizeModelFake);
		});

	// Read Many Objects Tests

	it("on getAll calls findAndCountAll() once",
		async () => {
			let modelFake = new SequelizeModelFake("fakeModel");
			let sut = new ApiService(modelFake);
			await sut.getAll(10, 1);
			expect(sut.model.findAndCountAll_callCount).toBe(1);
		});

	it("on getAll calls findAll() once",
		async () => {
			let modelFake = new SequelizeModelFake("fakeModel");
			let sut = new ApiService(modelFake);
			await sut.getAll('foo', 'bar');
			expect(sut.model.findAll_callCount).toBe(1);
		});

	it("on getAll calls findAll() with expected pagination object parameters",
		async () => {
			let modelFake = new SequelizeModelFake("fakeModel");
			let sut = new ApiService(modelFake);

			const page = 3
			const limit = 250

			const expectedOffset = limit * (page -1)

			await sut.getAll(limit, page);

			// Use toStrictEqual for deep equality comparison
			expect(sut.model.findAll_calledWith).toStrictEqual({
				limit: limit,
				offset: expectedOffset
			});
		});

	it("on getAll responds with hasError: false with a successful response",
		async () => {
			let modelFake = new SequelizeModelFake("fakeModel");
			let sut = new ApiService(modelFake);
			const response = await sut.getAll("foo", "bar");
			expect(response.hasError).toBe(false);
		});

	it("on getAll catches and responds with error if findAll Promise is rejected", async () => {
		let modelFake = new SequelizeModelFake("fakeModel", 10);

		// Force reject the findAll Promise
		const rejectedPromise = Promise.reject("findAll broke");
		modelFake.findAll = () => rejectedPromise;

		let sut = new ApiService(modelFake);
		const response = await sut.getAll(2, 3);

		// Use toStrictEqual for deep equality comparison
		expect(response).toStrictEqual({hasError: true, error: "findAll broke"})
	});

	it("on getAll catches and responds with error if findAndCountAll Promise is rejected", async () => {
		let modelFake = new SequelizeModelFake("fakeModel", 10);

		// Force reject the findAndCountAll Promise
		const rejectedPromise = Promise.reject("findAndCountAll broke");
		modelFake.findAndCountAll = () => rejectedPromise;

		let sut = new ApiService(modelFake);
		const response = await sut.getAll(2, 3);

		// Use toStrictEqual for deep equality comparison
		expect(response).toStrictEqual({hasError: true, error: "findAndCountAll broke"})
	});

	// Read Single Object Tests

	it("on getByPk gets a single object by its pk value", async () => {
		let modelFake = new SequelizeModelFake("fakeModel", 3);
		let sut = new ApiService(modelFake);
		const response = await sut.getByPk(2);
		expect(response.result.id).toBe(2)
	});

	it("on getByPk invokes model.findByPk", async () => {
		let modelFake = new SequelizeModelFake("fakeModel", 3);
		let sut = new ApiService(modelFake);
		await sut.getByPk(2);
		expect(modelFake.findByPk_callCount).toBe(1)
	});

	it("on getByPk calls model.findByPk with provided parameter", async () => {
		let modelFake = new SequelizeModelFake("fakeModel", 3);
		let sut = new ApiService(modelFake);
		await sut.getByPk("foo");
		expect(modelFake.findByPk_calledWith).toBe("foo")
	});

	it("on getByPk catches and respond with error if findByPk Promise is rejected", async () => {
		let modelFake = new SequelizeModelFake("fakeModel", 5);

		// Force reject the Promise
		const rejectedPromise = Promise.reject("it broke");
		modelFake.findByPk = () => rejectedPromise;

		let sut = new ApiService(modelFake);
		const response = await sut.getByPk(4);

		// Use toStrictEqual for deep equality comparison
		expect(response).toStrictEqual({hasError: true, error: "it broke"})
	});

	// Create Object Tests

	it("on create invokes model.create", async () => {
		let modelFake = new SequelizeModelFake("fakeModel", 3);
		let sut = new ApiService(modelFake);
		await sut.create({'foo': 'bar'})
		expect(modelFake.create_callCount).toBe(1);
	});

	it("on create invokes model.create with passed object parameter", async () => {
		let modelFake = new SequelizeModelFake("fakeModel", 3);
		let sut = new ApiService(modelFake);
		let fakeData = {foo: "bar", baz: "qux"}
		await sut.create(fakeData)
		expect(modelFake.create_calledWith).toBe(fakeData);
	});

	it("on create catches and responds with error if model.create Promise is rejected", async () => {
		let modelFake = new SequelizeModelFake("fakeModel", 5);

		// Force reject the Promise
		const rejectedPromise = Promise.reject("it broke");
		modelFake.create = () => rejectedPromise;

		let sut = new ApiService(modelFake);
		const response = await sut.create({fake: "data"});

		// Use toStrictEqual for deep equality comparison
		expect(response).toStrictEqual({hasError: true, error: "it broke"})
	});

	// Update Object Tests

	it("on update invokes model.update", async () => {
		let modelFake = new SequelizeModelFake("fakeModel", 3);
		let sut = new ApiService(modelFake);
		let fakeData = {foo: "bar", baz: "qux"}

		// Force the findByPk Promise to resolve to a value
		const foundModel = new SequelizeModelFake("foundModel", 5)
		const foundModelResolution = Promise.resolve(foundModel);
		modelFake.findByPk = () =>  foundModelResolution;

		await sut.update(5, fakeData)
		expect(foundModel.update_callCount).toBe(1);
	});

	it("on update first attempts to find an existing object by pk", async () => {
		let modelFake = new SequelizeModelFake("fakeModel", 3);
		let sut = new ApiService(modelFake);
		await sut.update(17, {fake: "updateData"});
		expect(modelFake.findByPk_calledWith).toBe(17);
	});

	it("on update returns notFound error if PK not found", async () => {
		let modelFake = new SequelizeModelFake("fakeModel", 3);
		let sut = new ApiService(modelFake);

		// Force the findByPk Promise to resolve to undefined
		const emptyObject = Promise.resolve(undefined);
		modelFake.findByPk = () =>  emptyObject;

		let res = await sut.update(17, {fake: "updateData"});
		expect(res).toStrictEqual({hasError: true, error: "notFound"});
	})

	it("on update returns an error if findByPk Promise is rejected", async () => {
		let modelFake = new SequelizeModelFake("fakeModel", 3);
		let sut = new ApiService(modelFake);

		// Force reject the Promise
		const rejectedPromise = Promise.reject("findByPk broke");
		modelFake.findByPk = () => rejectedPromise;

		let res = await sut.update(34, {fake: "updateData"});
		expect(res).toStrictEqual({hasError: true, error: "findByPk broke"});
	})

	it("on update returns an error if instance model.update Promise is rejected", async () => {
		let modelFake = new SequelizeModelFake("fakeModel", 3);
		let sut = new ApiService(modelFake);

		// Force the findByPk Promise to resolve to a value
		const foundModel = new SequelizeModelFake("foundModel", 5)
		const foundModelResolution = Promise.resolve(foundModel);
		modelFake.findByPk = () =>  foundModelResolution;

		// Force reject the update Promise
		const rejectedPromise = Promise.reject("update broke");
		foundModel.update = () => rejectedPromise;

		let res = await sut.update(32, {fake: "updateData"});
		expect(res).toStrictEqual({hasError: true, error: "update broke"});
	})

	// Destroy Object Tests

	it("on destroy invokes model.destroy", async () => {
		let modelFake = new SequelizeModelFake("fakeModel", 3);
		let sut = new ApiService(modelFake);

		// Force the findByPk Promise to resolve to a value
		const foundModel = new SequelizeModelFake("foundModel", 5)
		const foundModelResolution = Promise.resolve(foundModel);
		modelFake.findByPk = () =>  foundModelResolution;

		await sut.destroy(5)
		expect(foundModel.destroy_callCount).toBe(1);
	});

	it("on destroy invokes model.destroy with where clause", async () => {
		let modelFake = new SequelizeModelFake("fakeModel", 3);
		let sut = new ApiService(modelFake);

		// Force the findByPk Promise to resolve to a value
		const foundModel = new SequelizeModelFake("foundModel", 5)
		const foundModelResolution = Promise.resolve(foundModel);
		modelFake.findByPk = () =>  foundModelResolution;

		await sut.destroy(5)
		expect(foundModel.destroy_calledWith).toStrictEqual({where: {pk: 5}});
	});

	it("on destroy attempts to find an existing object by pk", async () => {
		let modelFake = new SequelizeModelFake("fakeModel", 3);
		let sut = new ApiService(modelFake);
		await sut.destroy(24);
		expect(modelFake.findByPk_calledWith).toBe(24);
	});

	it("on destroy returns notFound error if pk not found", async () => {
		let modelFake = new SequelizeModelFake("fakeModel", 3);
		let sut = new ApiService(modelFake);

		// Force the findByPk Promise to resolve to undefined
		const emptyObject = Promise.resolve(undefined);
		modelFake.findByPk = () =>  emptyObject;

		let res = await sut.destroy(17);
		expect(res).toStrictEqual({hasError: true, error: "notFound"});
	})

	it("on destroy returns an error if destroy Promise is rejected", async () => {
		let modelFake = new SequelizeModelFake("fakeModel", 3);
		let sut = new ApiService(modelFake);

		// Force the findByPk Promise to resolve to a value
		const foundModel = new SequelizeModelFake("foundModel", 5)
		const foundModelResolution = Promise.resolve(foundModel);
		modelFake.findByPk = () =>  foundModelResolution;

		// Force reject the destroy Promise
		const rejectedPromise = Promise.reject("destroy broke");
		foundModel.destroy = () => rejectedPromise;

		let res = await sut.destroy(98);
		expect(res).toStrictEqual({hasError: true, error: "destroy broke"});
	})

	it("on destroy returns an error on if findByPk Promise is rejected", async () => {
		let modelFake = new SequelizeModelFake("fakeModel", 3);
		let sut = new ApiService(modelFake);

		// Force reject the Promise
		const rejectedPromise = Promise.reject("findByPk broke");
		modelFake.findByPk = () => rejectedPromise;

		let res = await sut.destroy(34);
		expect(res).toStrictEqual({hasError: true, error: "findByPk broke"});
	})

	// Pagination Tests

	it("has a default MAX_GET_PAGE_SIZE of 100",
		() => {
			let modelFake = new SequelizeModelFake("fakeModel");
			let sut = new ApiService(modelFake);
			expect(sut.MAX_GET_ALL_PAGE_SIZE).toBe(100);
		});

	it.each`
	limit   | page | tableSize | expected
	${0}    | ${0} | ${0}      | ${0}    // 0th page always returns 0 results
	${1}    | ${0} | ${0}      | ${0}    // 0th page always returns 0 results
	${1}    | ${1} | ${0}      | ${0}    // Take 1 from page 1 with empty table returns 0 results
	${1}    | ${1} | ${1}      | ${1}    // Take 1 from page 1 with 1 result in table returns 1 result
	${2}    | ${1} | ${1}      | ${1}    // Take 2 from page 1 with 1 result in table returns 1 result
	${1}    | ${2} | ${1}      | ${0}    // Take 1 from page 2 with 1 result in table returns 0 results
	${100}  | ${1} | ${250}    | ${100}  // Take 100 from page 1 with 250 results in table returns 100 results
	${100}  | ${2} | ${250}    | ${100}  // Take 100 from page 2 with 250 results in table returns 100 results
	${100}  | ${3} | ${250}    | ${50}   // Take 100 from page 3 with 250 results in table returns 50 results
	`("returns $expected count given limit: $limit, page: $page, and table size: $tableSize",
		async ({limit, page, tableSize, expected}) => {
			let modelFake = new SequelizeModelFake("fakeModel", tableSize);
			let sut = new ApiService(modelFake);
			const response = await sut.getAll(limit, page);
			expect(response.result.count).toBe(expected);
		});

	it.each`
	input     | expected
	${0}      | ${0}
	${1}      | ${1}
	${889}    | ${889}
	${-1} | ${-1}
	`('sets custom MAX_GET_ALL_PAGE_SIZE with input ($input) via instance method',
		({input, expected}) => {
			let modelFake = new SequelizeModelFake("fakeModel");
			let sut = new ApiService(modelFake);
			sut.setMaxPaginationValue(input);
			expect(sut.MAX_GET_ALL_PAGE_SIZE).toBe(expected);
		});
})