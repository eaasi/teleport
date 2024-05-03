import ContentImportResource from '@/models/import/ContentImportResource';
import EnvironmentImportResource from '@/models/import/EnvironmentImportResource';
import ResourceImportFile from '@/models/import/ResourceImportFile';
import SoftwareImportResource from '@/models/import/SoftwareImportResource';
import EaasiTask from '@/models/task/EaasiTask';
import _importService from '@/services/ImportService';
import { IEmilUploadResponse } from '@/types/Eaas';
import { ICreateEnvironmentPayload, IEnvironmentImportSnapshot, IImageImportPayload, ImportType, IResourceImportFile, ResourceImportPath } from '@/types/Import';
import { ISoftwareObject } from '@/types/Resource';
import { ITaskState } from '@/types/Task';
import { IUserImportRelationRequest } from '@/types/UserImportRelation';
import { importTypes } from '@/utils/constants';
import { Store } from 'vuex';
import { make } from 'vuex-pathify';
import { GlobalState } from './global-store';

/*============================================================
 == State
/============================================================*/

class ImportState {
	chosenTemplateId: string = '';
	filesToUpload: IResourceImportFile[] = [];
	importPath: ResourceImportPath = 'Fast';
	importStep: number = 1;
	importType: ImportType = null;
	environment: EnvironmentImportResource = new EnvironmentImportResource();
	software: SoftwareImportResource = new SoftwareImportResource();
	content: ContentImportResource = new ContentImportResource();
	componentId: string = '';
	selectedFiles: ResourceImportFile[] = [];

	// True when we're running an environment import, such as from a file or URL
	isImportedEnvironment: boolean = false;

	// True when we're running an environment as an Object (Content) or Software Environment
	isConstructedEnvironment: boolean = false;
	constructedTitle: string = '';

	// Parameters used to define Environment Type when snapshot is called (objectEnvironment, etc)
	environmentType: string = '';
	environmentSoftwareId: string = '';
	environmentContentId: string = '';
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
	// state.importPath = 'Unselected';
	state.chosenTemplateId = '';
	state.software = new SoftwareImportResource();
	state.environment = new EnvironmentImportResource();
	state.componentId = '';
	state.selectedFiles = [];
};


mutations.INIT_FOR_TYPE = (state) => {
	state.importStep = 1;
	state.filesToUpload = [];
	// state.importPath = 'Unselected';
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
		if (importType === importTypes.IMAGE) {
			return await dispatch('importImage') as EaasiTask; // used to be import environment
		} else if (importType === importTypes.SOFTWARE) {
			return await dispatch('importSoftwareFromFile') as EaasiTask;
		} else if (importType === importTypes.CONTENT) {
			return await dispatch('importContentFromFile') as EaasiTask;
		} else {
			return null;
		}
	},

	/**
	 * Imports an Image from a URL and returns an EaasiTask object
	 * @param {Store<ImportState>} store
	 */
	async importImage({ state }: Store<ImportState>) {
		const payload: IImageImportPayload = {
			url: state.environment.urlSource,
			label: state.environment.title,
			description: `Image Import: ${state.environment.title}`,
		};

		return await _importService.importImage(payload) as ITaskState;
	},

	/**
	 * Imports a Software resource from file upload and returns an EaasiTask object
	 * @param {Store<ImportState>} store
	 */
	async importSoftwareFromFile({ state, dispatch, commit, rootState }): Promise<EaasiTask> {
		const uploadResponse = await dispatch('uploadContentResourceFiles');
		const globalState = rootState as GlobalState;
		if (uploadResponse.status === '0') {  // Success
			const blobs = uploadResponse.uploads;

			const importRequest = {
				label: state.software.title,
				userId: globalState.loggedInUser.id,
				files: [],
				description: `Import Software: ${state.software.title}`,
			};

			let i = 0;

			blobs.forEach(url => {
				const file = state.filesToUpload[i];
				importRequest.files.push({
					'filename': file.name,
					'deviceId': file.physicalFormat,
					'url': url,
				});
				i++;
			});

			commit('SET_FILES_TO_UPLOAD', []);
			return await _importService.importUploadBlob(importRequest);
		}
	},

	/**
	 * Imports a Content resource from file upload and returns an EaasiTask object
	 * @param {Store<ImportState>} store
	 */
	async importContentFromFile({ state, commit, dispatch, rootState }): Promise<EaasiTask> {
		const uploadResponse = await dispatch('uploadContentResourceFiles');
		const globalState = rootState as GlobalState;
		// uploadResponse.status 0 is success
		if (uploadResponse.status === '0') {
			const blobs = uploadResponse.uploads;

			const importRequest = {
				label: state.content.title,
				userId: globalState.loggedInUser.id,
				files: [],
				description: `Import Content: ${state.content.title}`,
			};

			let i = 0;
			blobs.forEach(url => {
				const file = state.filesToUpload[i];
				importRequest.files.push({
					'filename': file.name,
					'deviceId': file.physicalFormat,
					'url': url,
				});
				i++;
			});

			commit('SET_FILES_TO_UPLOAD', []);
			return await _importService.importUploadBlob(importRequest);
		}
	},

	async uploadContentResourceFiles({ state }): Promise<{
		uploadedItemList: any[];
		status: string;
		uploads: any[]
	}> {
		return await _importService.uploadContentResourceFilesNew(state.filesToUpload);
	},

	/**
	 * Triggers a snapshot of an imported environment
	 * @param store: Store<ImportState>
	 * @param importData: any object containing environment metadata to import
	 */
	async saveEnvironmentImport(_, importData: any) {
		const snapshot: IEnvironmentImportSnapshot = {
            componentId: importData.componentId,
			environmentId: importData.environmentId,
			importSaveDescription: importData.description,
			isRelativeMouse: false,
			objectId: null,
			softwareId: null,
			title: importData.title,
			userId: null
		};

		const result = await _importService.saveEnvironment(snapshot) as ITaskState;
		if (!result) console.error('No save result provided by snapshot response');
		return result;
	},

	/**
	 * Triggers a saveEnvironment request
	 * @param state: Store<ImportState>
	 * @param createPayload
	 * @param importData
	 */
	async createEnvironment(_: Store<ImportState>, createPayload: ICreateEnvironmentPayload) {
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
	},

	async setEnvironmentType({ commit }, { envType, softwareId, objectId }) {
		commit('SET_ENVIRONMENT_TYPE', envType);
		commit('SET_ENVIRONMENT_SOFTWARE_ID', softwareId);
		commit('SET_ENVIRONMENT_CONTENT_ID', objectId);
	},

	async clearEnvironment({ commit }) {
		commit('SET_ENVIRONMENT_TYPE', null);
		commit('SET_ENVIRONMENT_SOFTWARE_ID', null);
		commit('SET_ENVIRONMENT_CONTENT_ID', null);
		commit('SET_IS_CONSTRUCTED_ENVIRONMENT', false);
		commit('SET_IS_IMPORTED_ENVIRONMENT', false);
		commit('SET_CONSTRUCTED_TITLE', '');
	},

};

/*============================================================
 == Getters
/============================================================*/

const getters = {

	isImageImport(state: ImportState) {
		return state.importType === importTypes.IMAGE;
	},

	isContentImport(state: ImportState) {
		return state.importType === importTypes.CONTENT;
	},

	isSoftwareImport(state: ImportState) {
		return state.importType === importTypes.SOFTWARE;
	},

	isEnvironmentImport(state: ImportState) {
		return state.importType === importTypes.ENVIRONMENT;
	}

};

export default {
	state,
	mutations,
	actions,
	getters,
	namespaced: true
};
