const request = require('supertest')
const app = require('../src/app')


test('It should provide a 302 redirect response to GET', () => {
	return request(app).get("/").then(response => {
		expect(response.statusCode).toBe(302)
	})
})
