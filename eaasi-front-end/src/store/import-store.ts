import ResourceImportFile from '@/models/import/ResourceImportFile';
import EaasiTask from '@/models/task/EaasiTask';
import {ITaskState} from '@/types/Task';
import { importTypes } from '@/utils/constants';
import { make } from 'vuex-pathify';
import {
	ImportType,
	IResourceImportFile,
	ResourceImportPath,
	IEnvironmentImportSnapshot
} from '@/types/Import';
import { Store } from 'vuex';
import SoftwareImportResource from '@/models/import/SoftwareImportResource';
import EnvironmentImportResource from '@/models/import/EnvironmentImportResource';
import _importService from '@/services/ImportService';

/*============================================================
 == State
/============================================================*/

class ImportState {
	chosenTemplateId: string = '';
	filesToUpload: IResourceImportFile[] = [];
	importPath: ResourceImportPath = 'Unselected';
	importStep: number = 1;
	importType: ImportType = importTypes.SOFTWARE;
	environment: EnvironmentImportResource = new EnvironmentImportResource();
	software: SoftwareImportResource = new SoftwareImportResource();
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
	 * Imports an Environment resource and returns an EaasiTask object
	 * @param {Store<ImportState>} store
	 */
	async importEnvironment({ state, commit } : Store<ImportState>) {
		let environmentImport = {
			patchId: null,
			nativeConfig: state.environment.nativeConfig,
			templateId: state.environment.chosenTemplateId,
			urlString: state.environment.urlSource
		};

		let taskState = await _importService.importFromUrl(environmentImport) as ITaskState;
		if (!taskState) console.log('No Task Received in Response');
		let task = new EaasiTask(await taskState.taskId, `Environment Import from URL: ${environmentImport.urlString}`);
		commit('ADD_OR_UPDATE_TASK', task, {root: true});
		return task;
	},

	/**
	 * Imports a Software or Content resource and returns an EaasiTask object
	 * @param {Store<ImportState>} store
	 */
	async importSoftwareOrContent(store: Store<ImportState>) {
		let uploadResponse = await _importService.uploadContentResourceFiles(await store.state.filesToUpload);

		console.log('GOT UPLOAD RESPONSE', uploadResponse);

		// uploadResponse.status 0 is success
		if (uploadResponse.status === '0') {

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
	 * Triggers a resource import
	 * @param store
	 */
	async import({ state, dispatch }: Store<ImportState>) {
		const importType = state.importType;
		if (importType === importTypes.ENVIRONMENT) {
			return await dispatch('importEnvironment') as EaasiTask;
		} else if (importType === importTypes.SOFTWARE || importTypes.CONTENT) {
			return await dispatch('importSoftwareOrContent') as EaasiTask;
		} else {
			return null;
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
