import config from '@/config/index';
import AddHarvesterRequest from '@/models/eaas/oaipmh/AddHarvesterRequest';

describe('AddHarvesterRequest', () => {
	it('Should loop through provided syncTypes on construction', () => {
		let sut = new AddHarvesterRequest('foo', 'some/endpoint/url', ['foo', 'bar']);
		expect(sut.streams).toStrictEqual([
			{
				source: {
					url: 'some/endpoint/url/foo'
				},
				sink: {
					base_url: `${config.EMIL_SERVICE_ENDPOINT}/metadata-repositories/remote-foo`
				}
			},
			{
				source: {
					url: 'some/endpoint/url/bar'
				},
				sink: {
					base_url: `${config.EMIL_SERVICE_ENDPOINT}/metadata-repositories/remote-bar`
				}
			}
		]);
	});
});