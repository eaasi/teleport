import ContentImportResource from '@/models/import/ContentImportResource';
import EnvironmentImportResource from '@/models/import/EnvironmentImportResource';
import ResourceImportFile from '@/models/import/ResourceImportFile';
import SoftwareImportResource from '@/models/import/SoftwareImportResource';
import EaasiTask from '@/models/task/EaasiTask';
import _importService from '@/services/ImportService';
import { ICreateEnvironmentPayload, IEnvironmentImportSnapshot, ImportType, IResourceImportFile, ResourceImportPath } from '@/types/Import';
import { ISoftwareObject } from '@/types/Resource';
import { ITaskState } from '@/types/Task';
import { importTypes } from '@/utils/constants';
import { Store } from 'vuex';
import { make } from 'vuex-pathify';

/*============================================================
 == State
/============================================================*/

class ImportState {
	chosenTemplateId: string = '';
	filesToUpload: IResourceImportFile[] = [];
	importPath: ResourceImportPath = 'Unselected';
	importStep: number = 0;
	importType: ImportType = null;
	environment: EnvironmentImportResource = new EnvironmentImportResource();
	software: SoftwareImportResource = new SoftwareImportResource();
	content: ContentImportResource = new ContentImportResource();
	componentId: string = '';
	selectedFiles: ResourceImportFile[] = [];
}

const state = new ImportState();

/*============================================================
 == Mutations
/============================================================*/

const mutations = make.mutations(state);

mutations.RESET = (state) => {
	state.importStep = 0;
	state.importType = null;
	state.filesToUpload = [];
	state.importPath = 'Unselected';
	state.chosenTemplateId = '';
	state.software = new SoftwareImportResource();
	state.environment = new EnvironmentImportResource();
	state.componentId= '';
	state.selectedFiles = [];
};


mutations.INIT_FOR_TYPE = (state) => {
	state.importStep = 1;
	state.filesToUpload = [];
	state.importPath = 'Unselected';
	state.chosenTemplateId = '';
	state.software = new SoftwareImportResource();
	state.environment = new EnvironmentImportResource();
	state.componentId= '';
	state.selectedFiles = [];
};

/*============================================================
 == Actions
/============================================================*/

const actions = {

	/**
	 * Triggers a resource import
	 * @param store
	 */
	async import({ state, dispatch }: Store<ImportState>) {
		const importType = state.importType;
		if (importType === importTypes.ENVIRONMENT && !state.filesToUpload.length) {
			return await dispatch('importEnvironmentFromUrl') as EaasiTask;
		} else if (importType === importTypes.ENVIRONMENT && state.filesToUpload.length) {   // explicit check
			return await dispatch('importEnvironmentFromFile') as EaasiTask;
		} else if (importType === importTypes.SOFTWARE) {
			return await dispatch('importSoftwareFromFile') as EaasiTask;
		} else if (importType === importTypes.CONTENT) {
			return await dispatch('importContentFromFile') as EaasiTask;
		} else {
			return null;
		}
	},

	/**
	 * Imports an Environment resource from a URL and returns an EaasiTask object
	 * @param {Store<ImportState>} store
	 */
	async importEnvironmentFromUrl({ state, commit } : Store<ImportState>) {

		let environmentImport = {
			patchId: null,
			nativeConfig: state.environment.nativeConfig,
			templateId: state.environment.chosenTemplateId,
			urlString: state.environment.urlSource,
		};

		let taskState = await _importService.importFromUrl(environmentImport) as ITaskState;
		if (!taskState) console.log('No Task Received in Response');
		let task = new EaasiTask(await taskState.taskId, `Environment Import from URL: ${environmentImport.urlString}`);

		commit('ADD_OR_UPDATE_TASK', task, {root: true});
		return task;

	},

	/**
	 * Imports an Environment resource (as a content object file upload) and returns an EaasiTask object
	 * @param {Store<ImportState>} store
	 */
	async importEnvironmentFromFile(store: Store<ImportState>) {
		let uploadResponse = await _importService.uploadContentResourceFiles(await store.state.filesToUpload);

		if (uploadResponse.status === '0') {   // Success
			let blobs = uploadResponse.uploads;

			let importRequest = {
				label: store.state.environment.title,
				files: [],
			};

			let i = 0;
			blobs.forEach(async url => {
				let file = store.state.filesToUpload[i];
				importRequest.files.push({
					'filename': file.name,
					'deviceId': 'Q495265',
					'url': url,
				});
				i++;
			});

			let task = await _importService.importUploadBlob(importRequest);
			await store.commit('ADD_OR_UPDATE_TASK', task, {root: true});
			state.filesToUpload = [];
			return task;
		}
	},

	/**
	 * Imports a Software resource from file upload and returns an EaasiTask object
	 * @param {Store<ImportState>} store
	 */
	async importSoftwareFromFile(store: Store<ImportState>) {
		let uploadResponse = await _importService.uploadContentResourceFiles(await store.state.filesToUpload);

		if (uploadResponse.status === '0') {  // Success
			let blobs = uploadResponse.uploads;

			let importRequest = {
				label: store.state.software.title,
				files: [],
			};

			let i = 0;

			blobs.forEach(async url => {
				let file = store.state.filesToUpload[i];
				importRequest.files.push({
					'filename': file.name,
					'deviceId': file.physicalFormat,
					'url': url,
				});
				i++;
			});

			let task = await _importService.importUploadBlob(importRequest);
			await store.commit('ADD_OR_UPDATE_TASK', task, {root: true});
			state.filesToUpload = [];
			return task;
		}
	},

	/**
	 * Imports a Content resource from file upload and returns an EaasiTask object
	 * @param {Store<ImportState>} store
	 */
	async importContentFromFile(store: Store<ImportState>) {
		let uploadResponse = await _importService.uploadContentResourceFiles(store.state.filesToUpload);

		// uploadResponse.status 0 is success
		if (uploadResponse.status === '0') {
			let blobs = uploadResponse.uploads;

			let importRequest = {
				label: store.state.content.title,
				files: [],
			};

			let i = 0;
			blobs.forEach(async url => {
				let file = store.state.filesToUpload[i];
				importRequest.files.push({
					'filename': file.name,
					'deviceId': file.physicalFormat,
					'url': url,
				});
				i++;
			});

			let task = await _importService.importUploadBlob(importRequest);
			await store.commit('ADD_OR_UPDATE_TASK', task, {root: true});
			state.filesToUpload = [];
			return task;
		}
	},


	/**
	 * Triggers a snapshot of an imported environment
	 * @param store: Store<ImportState>
	 * @param importData: any object containing environment metadata to import
	 */
	async saveEnvironmentImport({ state }: Store<ImportState>, importData: any) {
		let snapshot: IEnvironmentImportSnapshot = {
            componentId: importData.componentId,
			environmentId: state.environment.eaasiID,
			importSaveDescription: importData.saveDesc,
			isRelativeMouse: false,
			objectId: null,
			softwareId: null,
			title: state.environment.title,
			userId: null
		};

		let result = await _importService.saveEnvironment(snapshot) as ITaskState;
		if (!result) console.log('No save result provided by snapshot response');
		return result;
	},

	/**
	 * Triggers a saveEnvironment request
	 * @param state: Store<ImportState>
	 * @param createPayload
	 * @param importData
	 */
	async createEnvironment({ state }: Store<ImportState>, createPayload: ICreateEnvironmentPayload) {
		return await _importService.createEnvironment(createPayload);
	},

	/**
	 * Triggers a saveSoftwareObject request
	 * @param state: Store<ImportState>
	 * @param software
	 * @param createPayload
	 */
	async saveSoftwareObject({ state }: Store<ImportState>, software: ISoftwareObject) {
		return await _importService.saveSoftwareObject(software);
	},

	/**
	 * Triggers a POST request to components
	 * @param state: Store<ImportState>
	 * @param createPayload
	 */
	async postComponents({ state }: Store<ImportState>, payload: any) {
		return await _importService.postComponents(payload);
	},

	async clearFiles({ commit }: Store<ImportState>) {
		commit('SET_SELECTED_FILES', []);
	}
};

/*============================================================
 == Getters
/============================================================*/

const getters = {};

export default {
	state,
	mutations,
	actions,
	getters,
	namespaced: true
};
