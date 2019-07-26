import ApiService from "../../../../src/services/base/api-service";
import SequelizeModelFake from "../../../helpers/doubles/sequelize-model-fake"


describe("API Service", () => {
	it("should assign domain model via ctor",
		() => {
			let modelSpy = new SequelizeModelFake("fakeModel");
			let sut = new ApiService(modelSpy);
			expect(sut.model).toBeInstanceOf(SequelizeModelFake);
		});

	it("should have default MAX_GET_PAGE_SIZE of 100",
		() => {
			let modelSpy = new SequelizeModelFake("fakeModel");
			let sut = new ApiService(modelSpy);
			expect(sut.MAX_GET_ALL_PAGE_SIZE).toBe(100);
		});

	it.each`
	input     | expected
	${0}      | ${0}
	${1}      | ${1}
	${10}     | ${10}
	${889}    | ${889}
	${-99999} | ${-99999}
	`
	('should set custom MAX_GET_ALL_PAGE_SIZE with input ($input) via instance method',
		({input, expected}) => {
			let modelSpy = new SequelizeModelFake("fakeModel");
			let sut = new ApiService(modelSpy);
			sut.setMaxPaginationValue(input);
			expect(sut.MAX_GET_ALL_PAGE_SIZE).toBe(expected);
		});

	it("should called findAndCountAll() once when getting all model instances",
		async () => {
			let modelSpy = new SequelizeModelFake("fakeModel");
			let sut = new ApiService(modelSpy);
			await sut.getAll(10, 1, 'id');
			expect(sut.model.findAndCountAll_callCount).toBe(1);
		});

	it("should called findAll() once when getting all model instances",
		async () => {
			let modelSpy = new SequelizeModelFake("fakeModel");
			let sut = new ApiService(modelSpy);
			await sut.getAll('foo', 'bar', 'baz');
			expect(sut.model.findAll_callCount).toBe(1);
		});

	it("should return correct length of results given page",
		async () => {
			let modelSpy = new SequelizeModelFake("fakeModel", 20);
			let sut = new ApiService(modelSpy);
			await sut.getAll('foo', 'bar', 'baz');
			expect(sut.model.findAll_callCount).toBe(1);
		});
})