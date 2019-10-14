import { IAddHarvesterRequest, IHarvesterStream } from '@/types/Harvesters';
import config from '@/config';

export default class AddHarvesterRequest implements IAddHarvesterRequest {
	name: string;
	streams: IHarvesterStream[] = [];

	constructor(name: string, endpointUrl: string, syncTypes: string []) {
		let syncUrl = `${config.EAASI_HOST}/metadata-repositories`;
		this.name = name;
		syncTypes.forEach(type => {
			this.streams.push({
				source: {
					url: `${endpointUrl}/${type}`
				},
				sink: {
					base_url: `${syncUrl}/remote-${type}`
				}
			});
		});
	}
}