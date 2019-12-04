/**
 * Mock Express Request
 * @param sessionData
 * @returns {{session: {data: *}}}
 */
export const mockRequest = (sessionData) => {
	return {
		session: { data: sessionData },
		query: {
			limit: 0,
			page: 0,
			sortCol: '',
			descending: false,
		}
	};
};

export const mockResponse = () => {
	const res = {};
	res.status = jest.fn().mockReturnValue(res);
	res.json = jest.fn().mockReturnValue(res);
	res.send = jest.fn().mockReturnValue(res);
	return res;
};
