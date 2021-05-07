import { ICreateEnvironmentPayload, IImageImportPayload, IImportObjectRequest, IUploadRequest } from '@/types/emil/Emil';
import { IEnvironmentImportSnapshot } from '@/types/resource/Import';
import { IComponentRequest } from '@/types/resource/Resource';
import { IEmilTask } from '@/types/task/Task';
import { objectArchiveTypes } from '@/utils/constants';
import BaseService from '../base/BaseService';
import EmilBaseService from '../base/EmilBaseService';
import ComponentService from '../resource/ComponentService';
import ContentService from '../resource/ContentService';
import EnvironmentService from '../resource/EnvironmentService';

/**
 * Handles resource import processes
 */
export default class ImportService extends BaseService {

	private readonly _environmentService: EnvironmentService;
	private readonly _contentService: ContentService;
	private readonly _componentService: ComponentService;
	private readonly _uploadService: EmilBaseService;

	constructor(
		environmentService: EnvironmentService = new EnvironmentService(),
		contentService: ContentService = new ContentService(),
		componentService: ComponentService = new ComponentService(),
		uploadService: EmilBaseService = new EmilBaseService('upload')
	) {
		super();
		this._environmentService = environmentService;
		this._contentService = contentService;
		this._componentService = componentService;
		this._uploadService = uploadService;
	}

	/**
	 * Posts Resource Import Data to trigger import task from a URL
	 */
	async importImage(payload: IImageImportPayload, token: string): Promise<IEmilTask> {
		return await this._environmentService.importImage(payload, token);
	}

	/**
	 * Posts to components endpoint
	 * @param payload IComponentRequest
	 * @param token - user JWT token
	 */
	async postComponents(payload: IComponentRequest, token: string) {
		return await this._componentService.postComponent(payload, token);
	}

	/**
	 * Posts Snapshot data to trigger saving an imported resource
	 */
	async snapshotImage(snapshot: IEnvironmentImportSnapshot, token: string) {
		return await this._environmentService.snapshotImage(snapshot, token);
	}

	/**
	 * Posts payload to create and environment
	 * @param payload
	 * @param token - user JWT token
	 */
	async createEnvironment(payload: ICreateEnvironmentPayload, token: string) {
		return await this._environmentService.createEnvironment(payload, token);
	}

	/**
	 * Posts Object Import Request data
	 * @param req : Request with req.body
	 */
	async importResourceFromFile({ files, label }: IImportObjectRequest, token: string): Promise<IEmilTask> {
		return await this._contentService.importObject({ files, label }, objectArchiveTypes.LOCAL, token)
	}

	/***
	 * Posts form data containing files
	 * @param req : Request with req.files
	 */
	async uploadFiles(req: IUploadRequest) {
		let responses = [];
		req.files.forEach(async file => {
			let res = await this._uploadService.postUpload('', file);
			responses.push(res);
		});
		return responses;
	}

}