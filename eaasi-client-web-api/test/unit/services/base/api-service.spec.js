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

	it.each`
	input     | expected
	${0}      | ${0}
	${1}      | ${1}
	${10}     | ${10}
	${889}    | ${889}
	${-99999} | ${-99999}
	`
	('should override MAX_GET_ALL_PAGE_SIZE with $input via instance method',
		({input, expected}) => {
			let sut = new ApiService(modelSpy)
			sut.setMaxPaginationValue(input)
			expect(sut.MAX_GET_ALL_PAGE_SIZE).toBe(expected)
		})
})