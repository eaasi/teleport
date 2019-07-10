const request = require('supertest')
const app = require('../../src/app')


describe('The root web API path', () => {
	it('should provide a 302 redirect response to GET', () => {
		return request(app).get("/").then(response => {
			expect(response.statusCode).toBe(302);
		})
	});

	it('should send redirect to /api/v1.0 in headers GET', () => {
		return request(app).get("/").then(response => {
			expect(response.headers.location).toBe('/api/v1.0');
		})
	});
})
