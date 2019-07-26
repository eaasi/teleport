import ApiService from "../../../../src/services/base/api-service";
import SequelizeModelFake from "../../../helpers/doubles/sequelize-model-fake"


describe("API Service", () => {
	it("should assign domain model via ctor",
		() => {
			let modelFake = new SequelizeModelFake("fakeModel");
			let sut = new ApiService(modelFake);
			expect(sut.model).toBeInstanceOf(SequelizeModelFake);
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
	${10}     | ${10}
	${889}    | ${889}
	${-99999} | ${-99999}
	`('should set custom MAX_GET_ALL_PAGE_SIZE with input ($input) via instance method',
		({input, expected}) => {
			let modelFake = new SequelizeModelFake("fakeModel");
			let sut = new ApiService(modelFake);
			sut.setMaxPaginationValue(input);
			expect(sut.MAX_GET_ALL_PAGE_SIZE).toBe(expected);
		});

	it("should called findAndCountAll() once when getting all model instances",
		async () => {
			let modelFake = new SequelizeModelFake("fakeModel");
			let sut = new ApiService(modelFake);
			await sut.getAll(10, 1, 'id');
			expect(sut.model.findAndCountAll_callCount).toBe(1);
		});

	it("should called findAll() once when getting all model instances",
		async () => {
			let modelFake = new SequelizeModelFake("fakeModel");
			let sut = new ApiService(modelFake);
			await sut.getAll('foo', 'bar', 'baz');
			expect(sut.model.findAll_callCount).toBe(1);
		});

	it("should respond with hasError: false with in a successful response object",
		async () => {
			let modelFake = new SequelizeModelFake("fakeModel");
			let sut = new ApiService(modelFake);
			const response = await sut.getAll('foo', 'bar', 'baz');
			expect(response.hasError).toBe(false);
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
})