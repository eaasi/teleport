import config from '@/config';
import { IAddHarvesterRequest, IHarvesterStream } from '@/types/Harvesters';

export default class AddHarvesterRequest implements IAddHarvesterRequest {
	name: string;
	streams: IHarvesterStream[] = [];

	constructor(name: string, endpointUrl: string, syncTypes: string []) {
		// TODO: Change syncUrl to use EAAS_HOST instead of EAAS_HOST_IP
		// This breaks because of current networking issue
		let syncUrl = `${config.EAASI_HOST_IP}/metadata-repositories`;
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