import {OK} from "../../../src/utils/http_response_codes";

describe('The response code', () => {
	it("for 'OK' should be 200", () => {
		const okCode = OK
		expect(200).toBe(okCode)
	});
})