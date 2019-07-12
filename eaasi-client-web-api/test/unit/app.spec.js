const request = require('supertest')
const appSpec = require('../../src/app')


describe('The root web API path', () => {
	it('should provide a 302 redirect response to GET', () => {
		return request(appSpec).get("/").then(response => {
			expect(response.statusCode).toBe(302);
		})
	});

	it('should send redirect to /api/v1.0 in headers GET', () => {
		return request(appSpec).get("/").then(response => {
			expect(response.headers.location).toBe('/api/v1.0');
		})
	});
})
