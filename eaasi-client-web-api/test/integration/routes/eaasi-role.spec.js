const request = require('supertest')
const app = require('../../../../src/app')


describe('The eaasi-role route', () => {
	it('should result in HTTP success response', () => {
		return request(app).get("/api/eaasi-role/").then(response => {
			expect(response.statusCode).toBe(200);
		})
	});
})
