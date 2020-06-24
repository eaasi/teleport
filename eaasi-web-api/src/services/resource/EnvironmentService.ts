import ReplicateEnvironmentRequest from '@/models/resource/ReplicateEnvironmentRequest';
import { ICreateEnvironmentPayload, IImageImportPayload } from '@/types/emil/Emil';
import { IEnvironment, IEnvironmentListItem } from '@/types/emil/EmilEnvironmentData';
import { IEnvironmentImportSnapshot, IPatch, ITemplate } from '@/types/resource/Import';
import { IClientEnvironmentRequest, IRevisionRequest, ISaveEnvironmentResponse, ISnapshotRequest, ISnapshotResponse } from '@/types/resource/Resource';
import { IEmilTask } from '@/types/task/Task';
import { archiveTypes, resourceTypes } from '@/utils/constants';
import BaseService from '../base/BaseService';
import EmilBaseService from '../base/EmilBaseService';
import ComponentService from './ComponentService';
import TempEnvironmentService from './TempEnvironmentService';

export default class EnvironmentService extends BaseService {

	private readonly _environmentRepoService: EmilBaseService;
	private readonly _componentService: ComponentService;
	private readonly _tempEnvironmentService: TempEnvironmentService;

	constructor(
		environmentRepository: EmilBaseService = new EmilBaseService('environment-repository'),
		componentService: ComponentService = new ComponentService(),
		tempEnvService: TempEnvironmentService = new TempEnvironmentService()
	) {
		super();
		this._environmentRepoService = environmentRepository;
		this._componentService = componentService;
		this._tempEnvironmentService = tempEnvService;
	}

	async getAll(): Promise<IEnvironment[]> {
		let res = await this._environmentRepoService.get('environments?detailed=true');
		let environments = await res.json() as IEnvironment[];
		environments.forEach(x => x.resourceType = resourceTypes.ENVIRONMENT);
		return environments;
	}

	async getAllEmilModels(): Promise<IEnvironmentListItem[]> {
		let res = await this._environmentRepoService.get('environments');
		let environments = await res.json() as IEnvironmentListItem[];
		environments.forEach(x => x.resourceType = resourceTypes.ENVIRONMENT);
		return environments;
	}

	/**
	 * Gets environment data for an array of environment list items
	 * @param {IEnvironmentListItem[]} envs A list of EnvironmentListItems
	 */
	async getEnvironmentsMetadata(envs: IEnvironmentListItem[]): Promise<IEnvironment[]> {
		let environments = await Promise.all(envs.map(env => {
			return this.getEnvironmentMetadata(env);
		}));
		environments.forEach(x => x.resourceType = resourceTypes.ENVIRONMENT);
		return environments;
	}

	/**
	 * Gets the respective environment object for a given environment list item
	 * @param {IEnvironmentListItem} env The environment list item
	 */
	async getEnvironmentMetadata(env: IEnvironmentListItem): Promise<IEnvironment> {
		let envMetadata = await this.getEnvironment(env.envId);
		if(envMetadata.hasOwnProperty('error') === false) return envMetadata;
		return {...env, error: envMetadata['error']} as unknown as IEnvironment;
	}

	/**
	 * Gets an Environment by ID
	 * @param id: string environmentId
	 */
	async getEnvironment(id: string): Promise<IEnvironment> {
		let res = await this._environmentRepoService.get(`environments/${id}`);
		let environment = await res.json() as IEnvironment;
		environment.resourceType = resourceTypes.ENVIRONMENT;
		return environment;
	}

	/**
	 * Replicate an Environment to local storage
	 * @param replicateRequest: ReplicateEnvironmentRequest {
	 *   destArchive: ArchiveType;
	 *   replicateList: string[];
	 * }
	 */
	async replicateEnvironment(replicateRequest: ReplicateEnvironmentRequest): Promise<ISaveEnvironmentResponse> {
		let response = await this._environmentRepoService.post('actions/replicate-image', replicateRequest)
		return response.json()
	}

	/**
	 * Delete an Environment from local storage
	 * @param id: environmentId
	 */
	async deleteEnvironment(id: string) {
		let environmentToDelete = {
			'envId': id,
			'deleteMetaData': true,
			'deleteImage': true,
			'force': true
		};

		let res = await this._environmentRepoService.delete(`environments/${id}`, environmentToDelete);
		return await res.json();
	}

	async saveNewObjectEnvironment(newEnvRequest: IClientEnvironmentRequest): Promise<ISnapshotResponse> {
		let snapshotRequest: ISnapshotRequest = {
			archive: archiveTypes.DEFAULT,
			envId: newEnvRequest.envId,
			isRelativeMouse: false,
			relativeMouse: false,
			message: newEnvRequest.description,
			title: newEnvRequest.title,
			objectId: newEnvRequest.objectId,
			softwareId: null,
			type: 'objectEnvironment',
			userId: null
		};

		return await this._componentService.saveSnapshot(newEnvRequest.componentId, snapshotRequest);
	}

	async saveNewEnvironment(newEnvRequest: IClientEnvironmentRequest) {
		let snapshotRequest: ISnapshotRequest = {
			type: 'newEnvironment',
			envId: newEnvRequest.envId,
			relativeMouse: false,
			isRelativeMouse: false,
			message: newEnvRequest.description,
			title: newEnvRequest.title,
			objectId: null,
			softwareId: null,
			userId: null,
			networking: {}
		};

		return await this._componentService.saveSnapshot(newEnvRequest.componentId, snapshotRequest);
	}

	async updateEnvironmentDescription(env: IEnvironment): Promise<IEnvironment> {
		const res = await this._environmentRepoService.patch(`environments/${env.envId}`, env);
		return res.json();
	}

	async createEnvironment(payload: ICreateEnvironmentPayload) {
		const res = await this._environmentRepoService.post('/actions/create-image', payload);
		return res.json();
	}

	async importResourceFromUrl(payload: IImageImportPayload): Promise<IEmilTask> {
		let res = await this._environmentRepoService.post('actions/import-image', payload);
		return await res.json() as IEmilTask;
	}

	/*============================================================
	 == Revisions
	/============================================================*/

	/**
	* Fork revision request
	* @param revisionRequest {
	*   id: string;
	* }
	*/
	async forkRevision(revisionRequest: IRevisionRequest) {
		let res = await this._environmentRepoService.post(`environments/${revisionRequest.envId}/revisions`, revisionRequest);
		return res.json();
	}

	/**
	 * Saves a revision from an existing running environment
	 * @param revisionEnvRequest {
	 * 	componentId: string;
	 *  description: string;
	 *  envId: string;
	 *  title: string;
	 *  networking?: INetworking;
	 *  objectId?: string;
	 * }
	 */
	async saveEnvironmentRevision(revisionEnvRequest: IClientEnvironmentRequest) {
		let snapshotRequest: ISnapshotRequest = {
			envId: revisionEnvRequest.envId,
			isRelativeMouse: false,
			message: revisionEnvRequest.description,
			objectId: null,
			softwareId: null,
			type: 'saveRevision',
			relativeMouse: false,
			userId: null
		};

		return await this._componentService.saveSnapshot(revisionEnvRequest.componentId, snapshotRequest);
	}

	/**
	 * Posts Snapshot data to trigger saving an imported resource
	 */
	async snapshotImage(snapshotRequest: IEnvironmentImportSnapshot) {
		const snapshot: ISnapshotRequest = {
			envId: snapshotRequest.environmentId,
			isRelativeMouse: snapshotRequest.isRelativeMouse,
			message: snapshotRequest.importSaveDescription,
			objectId: null,
			softwareId: null,
			title: snapshotRequest.title,
			type: 'saveImport',
			userId: null
		};

		return await this._componentService.saveSnapshot(snapshotRequest.componentId, snapshot)
	}

	/*============================================================
	 == Templates and Patches
	/============================================================*/

	// TODO: Add return interfaces to the methods above

	/**
	 * Gets a list of all available environment templates
	 */
	async getTemplates(): Promise<ITemplate[]> {
		let res = await this._environmentRepoService.get('templates');
		return res.json();
	}

	/**
	 * Gets a list of all available patches
	 */
	async getPatches(): Promise<IPatch[]> {
		let res = await this._environmentRepoService.get('patches');
		return res.json();
	}

	async getOperatingSystemMetadata() {
		let res = await this._environmentRepoService.get('os-metadata');
		return res.json();
	}

	async getNameIndexes() {
		let res = await this._environmentRepoService.get('image-name-index');
		return res.json();
	}

}
