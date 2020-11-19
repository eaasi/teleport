import { IComponentRequest, IEmulatorComponentRequest, IEmulatorComponentresponse, ISnapshotRequest, ISnapshotResponse } from '@/types/resource/Resource';
import BaseService from '../base/BaseService';
import EmilBaseService from '../base/EmilBaseService';

export default class ComponentService extends BaseService {

	private readonly _componentRepoService: EmilBaseService;

	constructor(
		componentRepoService: EmilBaseService = new EmilBaseService('components'),
	) {
		super();
		this._componentRepoService = componentRepoService;
	}

	async saveSnapshot(componentId: string, snapshotRequest: ISnapshotRequest): Promise<ISnapshotResponse> {
		const res = await this._componentRepoService.post(`${componentId}/snapshot`, snapshotRequest);
		return await res.json();
	}

	async postComponent(payload: IComponentRequest) {
		const res = await this._componentRepoService.post('/', payload);
		return await res.json();
	}

	async postEmulatorComponent(payload: IEmulatorComponentRequest): Promise<IEmulatorComponentresponse> {
		const res = await this._componentRepoService.post('/', payload);
		return await res.json();
	}

	async stopComponent(componentId: string) {
		const res = await this._componentRepoService.get(`${componentId}/stop`);
		return await res.json();
	}

	async deleteComponent(componentId: string) {
		const res = await this._componentRepoService.delete(componentId);
		return await res.json();
	}

	async keepAlive(componentId: string) {
		await this._componentRepoService.get(`${componentId}/keepalive`);
	}

	async controlurls(componentId: string) {
		await this._componentRepoService.get(`${componentId}/controlurls`);
	}

}
