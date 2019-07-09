const request = require('supertest')
const app = require('../../../src/app')


describe('Test the root path', () => {
	test('It should provide a 302 redirect response to GET', () => {
		return request(app).get("/").then(response => {
			expect(response.statusCode).toBe(302);
		})
	});

	test('It should send redirect to v1 API in headers GET', () => {
		return request(app).get("/").then(response => {
			expect(response.headers.location).toBe('/api/v1.0');
		})
	});
})
