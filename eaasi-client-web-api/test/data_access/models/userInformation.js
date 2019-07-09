const request = require('supertest')
const app = require('../../../src/app')


test('It should provide a 200 response to GET', () => {
	return request(app).get("/").then(response => {
		expect(response.statusCode).toBe(200)
	})
})
