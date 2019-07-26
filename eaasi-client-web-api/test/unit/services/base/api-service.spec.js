import ApiService from "../../../../src/services/base/api-service";
import SequelizeModelSpy from "../../../helpers/spies/sequelize-model-spy"


describe("API Service", () => {
	let modelSpy = new SequelizeModelSpy("fakeModel")

	it("should assign domain model via ctor", () => {
		let sut = new ApiService(modelSpy)
		expect(sut.model).toBeInstanceOf(SequelizeModelSpy)
	})

	it("should have default MAX_GET_PAGE_SIZE of 100", () => {
		let sut = new ApiService(modelSpy)
		expect(sut.MAX_GET_ALL_PAGE_SIZE).toBe(100)
	})

	it("should override MAX_GET_ALL_PAGE_SIZE via instance method", () => {
		let sut = new ApiService(modelSpy)
		sut.setMaxPaginationValue(2_000_000)
		expect(sut.MAX_GET_ALL_PAGE_SIZE).toBe(2_000_000)
	})
})