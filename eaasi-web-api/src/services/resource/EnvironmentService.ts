import { TempEnvironment } from '@/data_access/models/app/TempEnvironment';
import ImageListItem from '@/models/resource/ImageListItem';
import ReplicateEnvironmentRequest from '@/models/resource/ReplicateEnvironmentRequest';
import { ICreateEnvironmentPayload, IImageDeletePayload, IImageImportPayload } from '@/types/emil/Emil';
import { EmulatorNamedIndexes, IEnvironment, IEnvironmentListItem } from '@/types/emil/EmilEnvironmentData';
import { ITempEnvironmentRecord } from '@/types/emulation-porject/EmulationProject';
import { IEnvironmentImportSnapshot, IPatch, ITemplate } from '@/types/resource/Import';
import { IClientEnvironmentRequest, IEmulatorComponentRequest, IRevisionRequest, ISaveEnvironmentResponse, ISnapshotRequest, ISnapshotResponse } from '@/types/resource/Resource';
import { IEmilTask } from '@/types/task/Task';
import { archiveTypes, resourceTypes } from '@/utils/constants';
import BaseService from '../base/BaseService';
import EmilBaseService from '../base/EmilBaseService';
import ICrudServiceResult from '../interfaces/ICrudServiceResult';
import ComponentService from './ComponentService';
import TempEnvironmentService from './TempEnvironmentService';
import {getUserIdFromToken} from '../../utils/token'

export default class EnvironmentService extends BaseService {

	private readonly _environmentRepoService: EmilBaseService;
	private readonly _componentService: ComponentService;
	private readonly _tempEnvironmentService: TempEnvironmentService;
	private readonly _emulatorRepoService: EmilBaseService;
	private readonly CACHE_KEYS = {
		ALL_ENVIRONMENTS: 'all-environments'
	}

	constructor(
		environmentRepository: EmilBaseService = new EmilBaseService('environment-repository'),
		componentService: ComponentService = new ComponentService(),
		tempEnvService: TempEnvironmentService = new TempEnvironmentService(),
		emulatorRepository: EmilBaseService = new EmilBaseService('emulator-repository'),
	) {
		super();
		this._environmentRepoService = environmentRepository;
		this._componentService = componentService;
		this._tempEnvironmentService = tempEnvService;
		this._emulatorRepoService = emulatorRepository;
	}

	async getAll(token?: string, forceClearCache?: boolean): Promise<IEnvironment[]> {
		let userId = getUserIdFromToken(token);
		if (forceClearCache) {
			this.clearCache(userId);
		} else {
			let results = this._cache.get<IEnvironment[]>(`${this.CACHE_KEYS.ALL_ENVIRONMENTS}/${userId}`);
			if (results) return results;
		}
		let res = await this._environmentRepoService.get('environments?detailed=true&localOnly=false', token);
		let environments = await res.json() as IEnvironment[];
		environments.forEach(x => x.resourceType = resourceTypes.ENVIRONMENT);

		let tempEnvResponse = await this._tempEnvironmentService.getAllWhere({});
		if (tempEnvResponse.hasError || tempEnvResponse.result == null) {
			let tempEnvs = tempEnvResponse.result.map(r => r.get({ plain: true }) as ITempEnvironmentRecord);
			environments = environments.filter(env => !tempEnvs.some(temp => temp.envId == env.envId));
		}
		if (environments.length) this._cache.add(`${this.CACHE_KEYS.ALL_ENVIRONMENTS}/${userId}`, environments);
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
	 * @param token - user JWT token
	 */
	async getEnvironmentsMetadata(envs: IEnvironmentListItem[], token: string): Promise<IEnvironment[]> {
		let environments = await Promise.all(envs.map(env => {
			return this.getEnvironmentMetadata(env, token);
		}));
		environments.forEach(x => x.resourceType = resourceTypes.ENVIRONMENT);
		return environments;
	}

	/**
	 * Gets the respective environment object for a given environment list item
	 * @param {IEnvironmentListItem} env The environment list item
	 * @param token - user JWT token
	 */
	async getEnvironmentMetadata(env: IEnvironmentListItem, token: string): Promise<IEnvironment> {
		let envMetadata = await this.getEnvironment(env.envId, token);
		if(envMetadata.hasOwnProperty('error') === false) return envMetadata;
		return {...env, error: envMetadata['error']} as unknown as IEnvironment;
	}

	/**
	 * Gets an Environment by ID
	 * @param id: string environmentId
	 * @param token - optional user JWT token
	 */
	async getEnvironment(id: string, token?: string): Promise<IEnvironment> {
		let res = await this._environmentRepoService.get(`environments/${id}`, token);
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
	async replicateEnvironment(replicateRequest: ReplicateEnvironmentRequest, token?: string): Promise<ISaveEnvironmentResponse> {
		let response = await this._environmentRepoService.post('actions/replicate-image', replicateRequest, token);
		if(response.ok) this.clearCache( getUserIdFromToken(token));
		return response.json()
	}

	/**
	 * Delete an Environment from local storage
	 * @param id: environmentId
	 */
	async deleteEnvironment(id: string, token?: string) {
		let environmentToDelete = {
			'envId': id,
			'deleteMetaData': true,
			'deleteImage': true,
			'force': true
		};

		let res = await this._environmentRepoService.delete(`environments/${id}`, environmentToDelete, token);
		this.clearCache( getUserIdFromToken(token));
		return await res.json();
	}

	async saveNewObjectEnvironment(newEnvRequest: IClientEnvironmentRequest, token: string): Promise<ISnapshotResponse> {
		this.clearCache( getUserIdFromToken(token));
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

		return await this._componentService.saveSnapshot(newEnvRequest.componentId, snapshotRequest, token);
	}

	async saveNewEnvironment(newEnvRequest: IClientEnvironmentRequest, token: string) {
		this.clearCache( getUserIdFromToken(token));
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

		return await this._componentService.saveSnapshot(newEnvRequest.componentId, snapshotRequest, token);
	}

	async updateEnvironmentDescription(env: IEnvironment, token: string): Promise<IEnvironment> {
		const res = await this._environmentRepoService.patch(`environments/${env.envId}`, env, token);
		if(res.ok) this.clearCache( getUserIdFromToken(token));
		return await res.json();
	}

	async createEnvironment(payload: ICreateEnvironmentPayload, token: string) {
		const res = await this._environmentRepoService.post('environments', payload, token);
		if (res.ok) this.clearCache( getUserIdFromToken(token));
		return await res.json();
	}

	/*
	async importResourceFromUrl(payload: IImageImportPayload): Promise<IEmilTask> {
		let res = await this._environmentRepoService.post('actions/import-image', payload);
		if(res.ok) this.clearCache( getUserIdFromToken(token));
		return await res.json() as IEmilTask;
	}
	*/

	async createDerivative(payload: IEmulatorComponentRequest, token: string): Promise<IEnvironment> {
		const environment = await this.getEnvironment(payload.environment, token);
		const httpSvc = new EmilBaseService('EmilEnvironmentData');
		await httpSvc.get('init');
		const { error, id } = await this._componentService.postEmulatorComponent(payload, token);
		if (error) throw new Error(error);
		// add error handling for emil calls
		await this._componentService.controlurls(id, token);
		await this._componentService.keepAlive(id, token);
		const newEnvRequest: IClientEnvironmentRequest = {
			componentId: id,
			description: environment.description,
			envId: payload.environment,
			title: environment.title,
		}
		const response: ISnapshotResponse = await this.saveNewEnvironment(newEnvRequest, token);
		if (response.status == '1') {
			throw new Error(response.error ? response.error : response.message);
		}
		await this._componentService.stopComponent(id, token);
		this.clearCache( getUserIdFromToken(token));
		return await this.getEnvironment(response.envId, token);
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
	async forkRevision(revisionRequest: IRevisionRequest, token: string) {
		let res = await this._environmentRepoService.post(`environments/${revisionRequest.id}/revisions`, revisionRequest, token);
		if(res.ok) this.clearCache(getUserIdFromToken(token));
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
	 * @param token - user JWT token
	 */
	async saveEnvironmentRevision(revisionEnvRequest: IClientEnvironmentRequest, token: string) {
		this.clearCache( getUserIdFromToken(token));
		let envId = revisionEnvRequest.envId;
		let isTempEnv = await this._isTempEnvironment(envId);
		if (isTempEnv) {
			let parentEnv = await this.getEnvironment(envId, token);
			envId = parentEnv.parentEnvId;
		}
		let snapshotRequest: ISnapshotRequest = {
			envId,
			isRelativeMouse: false,
			message: revisionEnvRequest.description,
			objectId: revisionEnvRequest.objectId,
			softwareId: revisionEnvRequest.softwareId,
			archive: revisionEnvRequest.archive,
			type: 'saveRevision',
			relativeMouse: false,
			userId: null
		};
		let snapshotResult = await this._componentService.saveSnapshot(revisionEnvRequest.componentId, snapshotRequest, token);
		if (isTempEnv) {
			// snapshotResult.
			let revisionEnv = await this.getEnvironment(snapshotResult.envId, token);
			// update result environment
			let updatedRevisionEnv: IEnvironment = {...revisionEnvRequest.environment, envId: revisionEnv.envId};
			let res = await this.updateEnvironmentDescription(updatedRevisionEnv, token);
			// delete temp environment
			await this.deleteFromTempArchive(envId);
		}
		return snapshotResult;
	}

	/**
	 * Posts Snapshot data to trigger saving an imported resource
	 */
	async snapshotImage(snapshotRequest: IEnvironmentImportSnapshot, token: string) {
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

		return await this._componentService.saveSnapshot(snapshotRequest.componentId, snapshot, token)
	}

	/*============================================================
	 == Images
	/============================================================*/
	async getImages(token: string): Promise<ImageListItem[]> {
		let res = await this._environmentRepoService.get('images-index', token);
		const nameIndexes = await res.json() as EmulatorNamedIndexes;
		return nameIndexes && nameIndexes.entries && nameIndexes.entries.entry && nameIndexes.entries.entry.length
			? nameIndexes.entries.entry.map(entry => new ImageListItem(entry.value)) : [];
	}

	async importImage(payload: IImageImportPayload, token: string): Promise<IEmilTask> {
		let res = await this._environmentRepoService.post('actions/import-image', payload, token);
		return await res.json() as IEmilTask;
	}

	async deleteImage(payload: IImageDeletePayload, token: string) {
		await this._environmentRepoService.post('actions/delete-image', payload, token);
	}

	/*============================================================
	 == Templates and Patches
	/============================================================*/
	/**
	 * Gets a list of all available environment templates
	 */
	async getTemplates(token?: string): Promise<ITemplate[]> {
		let res = await this._environmentRepoService.get('templates', token);
		return res.json();
	}

	/**
	 * Gets a list of all available patches
	 */
	async getPatches(token?: string): Promise<IPatch[]> {
		let res = await this._environmentRepoService.get('patches', token);
		return res.json();
	}

	async getOperatingSystemMetadata(token?: string) {
		let res = await this._environmentRepoService.get('os-metadata', token);
		return res.json();
	}

	async getEmulators(token?: string) {
		let res = await this._emulatorRepoService.get('emulators', token);
		return res.json();
	}

	/*============================================================
	 == Temporary Environments
	/============================================================*/

	async addToTempArchive(userId: string, envId: string): Promise<ITempEnvironmentRecord> {
		let tempEnvRecord: ITempEnvironmentRecord = { userId, envId };
		let response = await this._tempEnvironmentService.create(tempEnvRecord);
		return await response.result.get({ plain: true })  as ITempEnvironmentRecord;
	}

	async deleteFromTempArchive(envId: string): Promise<ITempEnvironmentRecord> {
		let tempEnvRecord = await this._tempEnvironmentService.getOneWhere({ envId });
		let plain = tempEnvRecord.result.get({ plain: true }) as ITempEnvironmentRecord;
		await this._tempEnvironmentService.destroy(plain.id);
		return plain;
	}

	async getAllTemp(): Promise<ICrudServiceResult<TempEnvironment[]>> {
		return await this._tempEnvironmentService.getAllWhere({});
	}

	async _isTempEnvironment(envId: string): Promise<boolean> {
		let res = await this._tempEnvironmentService.getOneWhere({
			where: {
				envId
			}
		})
		if (!res.result || res.hasError) return false;
		let plain = await res.result.get({ plain: true });
		return plain != null;
	}

	/*============================================================
	 == Cache
	/============================================================*/

	clearCache(userId: string) {
		this._cache.delete(`${this.CACHE_KEYS.ALL_ENVIRONMENTS}/${userId}`);
	}

}
