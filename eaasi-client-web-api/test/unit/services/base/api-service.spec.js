
const modelSpy = new SequelizeModelSpy()

describe("API Service", () => {
	it("should assign domain model via ctor", () => {
		let sut = ApiService(modelSpy)
	})
})