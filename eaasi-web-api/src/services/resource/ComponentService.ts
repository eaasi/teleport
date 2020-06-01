import { IComponentRequest, ISnapshotRequest } from '@/types/resource/Resource';
import BaseService from '../base/BaseService';
import EmilBaseService from '../eaas/emil/EmilBaseService';

export default class ComponentService extends BaseService {

	private readonly _componentRepoService: EmilBaseService;

	constructor(
		componentRepoService: EmilBaseService = new EmilBaseService('components'),
	) {
		super();
		this._componentRepoService = componentRepoService;
	}

	async saveSnapshot(componentId: string, snapshotRequest: ISnapshotRequest) {
		const res = await this._componentRepoService.post(`${componentId}/snapshot`, snapshotRequest);
		return await res.json();
	}

	async postComponent(payload: IComponentRequest) {
		const res = await this._componentRepoService.post('/', payload);
		return await res.json();
	}

}