import { make } from 'vuex-pathify';
import { ImportType, IResourceImportFile, ResourceImportPath } from '@/types/Import';
import { Store } from 'vuex';
import SoftwareImportResource from '@/models/import/SoftwareImportResource';
import EnvironmentImportResource from '@/models/import/EnvironmentImportResource';

/*============================================================
 == State
/============================================================*/

class ImportState {
	environment: EnvironmentImportResource = new EnvironmentImportResource();
	importPath: ResourceImportPath = 'Unselected';
	importStep: number = 1;
	importType: ImportType = 'software';
	software: SoftwareImportResource = new SoftwareImportResource();
	filesToUpload: IResourceImportFile[] = [];
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
	state.software = new SoftwareImportResource();
	state.environment = new EnvironmentImportResource();
};


mutations.INIT_FOR_TYPE = (state) => {
	state.importStep = 1;
	state.filesToUpload = [];
	state.importPath = 'Unselected';
	state.software = new SoftwareImportResource();
	state.environment = new EnvironmentImportResource();
};

/*============================================================
 == Actions
/============================================================*/

const actions = {
	import(store: Store<ImportState>) {
		console.log('Import Started');
		// TODO:
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
