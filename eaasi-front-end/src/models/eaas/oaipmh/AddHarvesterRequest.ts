import config from '@/config';
import { IAddHarvesterRequest, IHarvesterStream } from '@/types/Harvesters';

const SYNC_URL: string = `${config.EMIL_SERVICE_ENDPOINT}/metadata-repositories`;

export default class AddHarvesterRequest implements IAddHarvesterRequest {

	name: string;
	streams: IHarvesterStream[] = [];

	constructor(name: string, endpointUrl: string, syncTypes: string [], secret: string = null) {
		this.name = name;
		syncTypes.forEach(type => 
			this.streams.push(this._constructHarvesterStream(endpointUrl, type, secret))
		);
	}

	private _constructHarvesterStream(endpointUrl: string, type: string, secret: string = null): IHarvesterStream {
		const harvesterStream: IHarvesterStream = {
			source: {
				url: `${endpointUrl}/${type}`
			},
			sink: {
				base_url: `${SYNC_URL}/remote-${type}`
			}
		};
		if (secret) harvesterStream.source.secret = secret;
		return harvesterStream;
	}
	
}