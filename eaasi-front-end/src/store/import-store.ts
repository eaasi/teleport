import EaasiTask from '@/models/task/EaasiTask';
import {ITaskState} from '@/types/Task';
import { make } from 'vuex-pathify';
import {IImageImport, ImportType, IResourceImportFile, ResourceImportPath} from '@/types/Import';
import { Store } from 'vuex';
import SoftwareImportResource from '@/models/import/SoftwareImportResource';
import EnvironmentImportResource from '@/models/import/EnvironmentImportResource';
import _importService from '@/services/ImportService';

/*============================================================
 == State
/============================================================*/

class ImportState {
	chosenTemplate: string = '';
	environment: EnvironmentImportResource = new EnvironmentImportResource();
	filesToUpload: IResourceImportFile[] = [];
	importPath: ResourceImportPath = 'Unselected';
	importStep: number = 1;
	importType: ImportType = 'software';
	software: SoftwareImportResource = new SoftwareImportResource();
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
	state.chosenTemplate = '';
	state.software = new SoftwareImportResource();
	state.environment = new EnvironmentImportResource();
};


mutations.INIT_FOR_TYPE = (state) => {
	state.importStep = 1;
	state.filesToUpload = [];
	state.importPath = 'Unselected';
	state.chosenTemplate = '';
	state.software = new SoftwareImportResource();
	state.environment = new EnvironmentImportResource();
};

/*============================================================
 == Actions
/============================================================*/

const actions = {
	/**
	 * Triggers an image import
	 * @param store
	 */
	async import(store: Store<ImportState>) {
		let imageImport = {
			nativeConfig: store.state.software.nativeConfig,
			patchId: null,
			templateId: store.state.chosenTemplate,
			urlString: store.state.software.urlSource
		};

		let taskState = await _importService.importImageFromUrl(imageImport) as ITaskState;

		if (!taskState) {
			console.log('No Task Received in Response');
		}

		let task = new EaasiTask(taskState.taskId, `Image Import from URL: ${imageImport.urlString}`);

		store.commit('ADD_OR_UPDATE_TASK', task, {root: true});
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
