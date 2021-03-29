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

	async saveSnapshot(componentId: string, snapshotRequest: ISnapshotRequest, token: string): Promise<ISnapshotResponse> {
		const res = await this._componentRepoService.post(`${componentId}/snapshot`, snapshotRequest, token);
		return await res.json();
	}

	async postComponent(payload: IComponentRequest, token: string) {
		const res = await this._componentRepoService.post('/', payload, token);
		return await res.json();
	}

	async postEmulatorComponent(payload: IEmulatorComponentRequest, token: string): Promise<IEmulatorComponentresponse> {
		const res = await this._componentRepoService.post('/', payload, token);
		return await res.json();
	}

	async stopComponent(componentId: string, token: string) {
		const res = await this._componentRepoService.get(`${componentId}/stop`, token);
		return await res.json();
	}

	async deleteComponent(componentId: string, token: string) {
		const res = await this._componentRepoService.delete(componentId, token);
		return await res.json();
	}

	async keepAlive(componentId: string, token: string) {
		await this._componentRepoService.get(`${componentId}/keepalive`, token);
	}

	async controlurls(componentId: string, token: string) {
		await this._componentRepoService.get(`${componentId}/controlurls`, token);
	}

}
