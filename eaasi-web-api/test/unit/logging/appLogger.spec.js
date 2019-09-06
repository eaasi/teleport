describe('Application Logger', () => {
	// Constructor Tests

	it('on initialization assigns object model via ctor', () => {
		let modelFake = new SequelizeModelFake('fakeModel');
		let sut = new CrudService(modelFake);
		expect(sut.model).toBeInstanceOf(SequelizeModelFake);
	});

	// Read Many Objects Tests

	it('on getAll calls findAndCountAll() once', async () => {
		let modelFake = new SequelizeModelFake('fakeModel');
		let sut = new CrudService(modelFake);
		await sut.getAll(10, 1);
		expect(sut.model.findAndCountAll_callCount).toBe(1);
	});

	it('on getAll calls findAll() with expected pagination object parameters', async () => {
		let modelFake = new SequelizeModelFake('fakeModel');
		let sut = new CrudService(modelFake);
		const page = 3;
		const limit = 250;
		const expectedOffset = limit * (page - 1);

		await sut.getAll(limit, page);

		// Use toStrictEqual for deep equality comparison
		expect(sut.model.findAll_calledWith).toStrictEqual({
			limit: limit,
			offset: expectedOffset
		});
	});
});
