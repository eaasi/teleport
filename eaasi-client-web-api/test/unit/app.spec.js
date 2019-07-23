const request = require('supertest')
const app = require('../../src/app')


describe('The root web API path', () => {
	it('should provide a 200 success response to GET', () => {
		return request(app).get("/api/").then(response => {
			expect(response.statusCode).toBe(200);
		})
	});
})
