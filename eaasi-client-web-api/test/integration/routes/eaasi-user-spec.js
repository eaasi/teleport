const request = require('supertest')
const app = require('../../../../src/app')


describe('The eaasi-user route', () => {
	it('should result in HTTP success response', () => {
		return request(app).get("/api/eaasi-user/").then(response => {
			expect(response.statusCode).toBe(200);
		})
	});
})
