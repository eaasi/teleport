import EaasiTask from '@/models/task/EaasiTask';
import {ITaskState} from '@/types/Task';
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
	importType: ImportType = 'software';
	environment: EnvironmentImportResource = new EnvironmentImportResource();
	software: SoftwareImportResource = new SoftwareImportResource();
	componentId: string = '';
	saveDescription: string = '';
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
	state.saveDescription = '';
};


mutations.INIT_FOR_TYPE = (state) => {
	state.importStep = 1;
	state.filesToUpload = [];
	state.importPath = 'Unselected';
	state.chosenTemplateId = '';
	state.software = new SoftwareImportResource();
	state.environment = new EnvironmentImportResource();
	state.componentId= '';
	state.saveDescription = '';
};

/*============================================================
 == Actions
/============================================================*/

const actions = {
	/**
	 * Triggers a resource import
	 * @param store
	 */
	async import(store: Store<ImportState>) {
		// TODO: Separate Import Environment / Software / Content import

		let environmentImport = {
			patchId: null,
			nativeConfig: store.state.environment.nativeConfig,
			templateId: store.state.environment.chosenTemplateId,
			urlString: store.state.environment.urlSource
		};

		let taskState = await _importService.importFromUrl(environmentImport) as ITaskState;
		if (!taskState) console.log('No Task Received in Response');
		let task = new EaasiTask(taskState.taskId, `Environment Import from URL: ${environmentImport.urlString}`);
		await store.commit('ADD_OR_UPDATE_TASK', task, {root: true});
		return task;
	},

	/**
	 * Triggers a snapshot of an imported environment
	 * @param store
	 */
	async saveEnvironmentImport(store: Store<ImportState>) {
		let snapshot: IEnvironmentImportSnapshot = {
			componentId: store.state.componentId,
			environmentId: store.state.environment.eaasiID,
			importSaveDescription:store.state.environment.saveDescription,
			isRelativeMouse: false,
			objectId: null,
			softwareId: null,
			title: store.state.environment.title,
			userId: null
		};

		let result = await _importService.saveEnvironment(snapshot) as ITaskState;
		if (!result) console.log('No save result provided by snapshot response');
		return result;
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
