import BaseHttpService from '@/services/BaseHttpService';
declare let global: any;

describe('BaseHttpService', () => {
	beforeEach(() => {
		global.Request = jest.fn().mockImplementation();
		global.fetch = jest.fn().mockImplementation(() => {
			const p = new Promise((resolve, reject) => {
				resolve({
					ok: true,
					Id: '123',
					json: function() {
						return {Id: '123'};
					}
				});
			});
			return p;
		});

	});

	afterEach(() => {
		global.Request.mockReset();
		global.Request = null;
		global.fetch.mockReset();
		global.fetch = null;
	});

	it('should invoke fetch once when calling get()', async () => {
		const sut = new BaseHttpService();
		const response = await sut.get('http://foo.bar');
		expect(global.fetch).toHaveBeenCalledTimes(1);
	});

	it('should invoke fetch once when calling post()', async () => {
		const sut = new BaseHttpService();
		const response = await sut.post('http://foo.bar/data', {foo: 'bar'});
		expect(global.fetch).toHaveBeenCalledTimes(1);
	});

	it('should invoke fetch once when calling postUpload()', async () => {
		const sut = new BaseHttpService();
		const response = await sut.postUpload('http://foo.bar', {} as FormData);
		expect(global.fetch).toHaveBeenCalledTimes(1);
	});

	it('should invoke fetch once when calling put()', async () => {
		const sut = new BaseHttpService();
		const response = await sut.put('http://foo.bar', {id: 2, name: 'quux'});
		expect(global.fetch).toHaveBeenCalledTimes(1);
	});

	it('should invoke fetch once when calling delete()', async () => {
		const sut = new BaseHttpService();
		const response = await sut.delete('http://foo.bar/users/21342');
		expect(global.fetch).toHaveBeenCalledTimes(1);
	});
});