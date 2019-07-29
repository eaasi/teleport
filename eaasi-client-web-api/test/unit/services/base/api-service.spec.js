import ApiService from "../../../../src/services/base/api-service";
import SequelizeModelFake from "../../../helpers/doubles/sequelize-model-fake"


describe("API Service", () => {

	// Constructor Tests

	it("should assign domain model via ctor",
		() => {
			let modelFake = new SequelizeModelFake("fakeModel");
			let sut = new ApiService(modelFake);
			expect(sut.model).toBeInstanceOf(SequelizeModelFake);
		});

	// Read Many Objects Tests

	it("should call findAndCountAll() once when calling getAll()",
		async () => {
			let modelFake = new SequelizeModelFake("fakeModel");
			let sut = new ApiService(modelFake);
			await sut.getAll(10, 1);
			expect(sut.model.findAndCountAll_callCount).toBe(1);
		});

	it("should call findAll() once when calling getAll()",
		async () => {
			let modelFake = new SequelizeModelFake("fakeModel");
			let sut = new ApiService(modelFake);
			await sut.getAll('foo', 'bar');
			expect(sut.model.findAll_callCount).toBe(1);
		});

	it("should call findAll() with expected pagination object param when calling getAll()",
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

	it("should respond with hasError: false with in a successful response object",
		async () => {
			let modelFake = new SequelizeModelFake("fakeModel");
			let sut = new ApiService(modelFake);
			const response = await sut.getAll("foo", "bar");
			expect(response.hasError).toBe(false);
		});

	it("should catch and respond with error if getAll fails", async () => {
		let modelFake = new SequelizeModelFake("fakeModel", 10);

		// Force reject the Promise
		const rejectedPromise = Promise.reject("it broke");
		modelFake.findAll = () => rejectedPromise;

		let sut = new ApiService(modelFake);
		const response = await sut.getAll(2, 3);

		// Use toStrictEqual for deep equality comparison
		expect(response).toStrictEqual({hasError: true, error: "it broke"})
	});

	// Read Single Object Tests

	it("should get a single object by pk", async () => {
		let modelFake = new SequelizeModelFake("fakeModel", 3);
		let sut = new ApiService(modelFake);
		const response = await sut.getByPk(2);
		expect(response.result.id).toBe(2)
	});

	it("should invoke model.findByPk when getByPk method is called", async () => {
		let modelFake = new SequelizeModelFake("fakeModel", 3);
		let sut = new ApiService(modelFake);
		await sut.getByPk(2);
		expect(modelFake.findByPk_callCount).toBe(1)
	});

	it("should call model.findByPk with param passed to getByPk", async () => {
		let modelFake = new SequelizeModelFake("fakeModel", 3);
		let sut = new ApiService(modelFake);
		await sut.getByPk("foo");
		expect(modelFake.findByPk_calledWith).toBe("foo")
	});

	it("should catch and respond with error if getByPk fails", async () => {
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

	it("should invoke model.create when create method is called", async () => {
		let modelFake = new SequelizeModelFake("fakeModel", 3);
		let sut = new ApiService(modelFake);
		await sut.create({'foo': 'bar'})
		expect(modelFake.create_callCount).toBe(1);
	});

	it("should invoke model.create with passed params", async () => {
		let modelFake = new SequelizeModelFake("fakeModel", 3);
		let sut = new ApiService(modelFake);
		let fakeData = {foo: "bar", baz: "qux"}
		await sut.create(fakeData)
		expect(modelFake.create_calledWith).toBe(fakeData);
	});

	it("should catch and respond with error if create fails", async () => {
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

	it("should invoke model.update", async () => {
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

	it("should on update first attempt to find an existing object by pk", async () => {
		let modelFake = new SequelizeModelFake("fakeModel", 3);
		let sut = new ApiService(modelFake);
		await sut.update(17, {fake: "updateData"});
		expect(modelFake.findByPk_calledWith).toBe(17);
	});

	it("should return notFound error if PK not found before update", async () => {
		let modelFake = new SequelizeModelFake("fakeModel", 3);
		let sut = new ApiService(modelFake);

		// Force the findByPk Promise to resolve to undefined
		const emptyObject = Promise.resolve(undefined);
		modelFake.findByPk = () =>  emptyObject;

		let res = await sut.update(17, {fake: "updateData"});
		expect(res).toStrictEqual({hasError: true, error: "notFound"});
	})

	// Destroy Object Tests

	it("should invoke model.destroy", async () => {
		let modelFake = new SequelizeModelFake("fakeModel", 3);
		let sut = new ApiService(modelFake);

		// Force the findByPk Promise to resolve to a value
		const foundModel = new SequelizeModelFake("foundModel", 5)
		const foundModelResolution = Promise.resolve(foundModel);
		modelFake.findByPk = () =>  foundModelResolution;

		await sut.destroy(5)
		expect(foundModel.destroy_callCount).toBe(1);
		console.log("DESTROY CALLE WITH:", foundModel.destroy_calledWith)
	});

	it("should invoke model.destroy with where: pk clause", async () => {
		let modelFake = new SequelizeModelFake("fakeModel", 3);
		let sut = new ApiService(modelFake);

		// Force the findByPk Promise to resolve to a value
		const foundModel = new SequelizeModelFake("foundModel", 5)
		const foundModelResolution = Promise.resolve(foundModel);
		modelFake.findByPk = () =>  foundModelResolution;

		await sut.destroy(5)
		expect(foundModel.destroy_calledWith).toStrictEqual({where: {pk: 5}});
	});

	it("should on destroy first attempt to find an existing object by pk", async () => {
		let modelFake = new SequelizeModelFake("fakeModel", 3);
		let sut = new ApiService(modelFake);
		await sut.destroy(24);
		expect(modelFake.findByPk_calledWith).toBe(24);
	});

	it("should return notFound error if PK not found before destroy", async () => {
		let modelFake = new SequelizeModelFake("fakeModel", 3);
		let sut = new ApiService(modelFake);

		// Force the findByPk Promise to resolve to undefined
		const emptyObject = Promise.resolve(undefined);
		modelFake.findByPk = () =>  emptyObject;

		let res = await sut.destroy(17);
		expect(res).toStrictEqual({hasError: true, error: "notFound"});
	})



	// Pagination Tests

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
	`("should return $expected count given limit: $limit, page: $page, and table size: $tableSize",
		async ({limit, page, tableSize, expected}) => {
			let modelFake = new SequelizeModelFake("fakeModel", tableSize);
			let sut = new ApiService(modelFake);
			const response = await sut.getAll(limit, page);
			expect(response.result.count).toBe(expected);
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
	`("should return $expected results on a page given limit: $limit, page: $page, and table size: $tableSize",
		async ({limit, page, tableSize, expected}) => {
			let modelFake = new SequelizeModelFake("fakeModel", tableSize);
			let sut = new ApiService(modelFake);
			const response = await sut.getAll(limit, page);
			expect(response.result.result.length).toBe(expected);
		});

	it("should have default MAX_GET_PAGE_SIZE of 100",
		() => {
			let modelFake = new SequelizeModelFake("fakeModel");
			let sut = new ApiService(modelFake);
			expect(sut.MAX_GET_ALL_PAGE_SIZE).toBe(100);
		});

	it.each`
	input     | expected
	${0}      | ${0}
	${1}      | ${1}
	${889}    | ${889}
	${-1} | ${-1}
	`('should set custom MAX_GET_ALL_PAGE_SIZE with input ($input) via instance method',
		({input, expected}) => {
			let modelFake = new SequelizeModelFake("fakeModel");
			let sut = new ApiService(modelFake);
			sut.setMaxPaginationValue(input);
			expect(sut.MAX_GET_ALL_PAGE_SIZE).toBe(expected);
		});
})