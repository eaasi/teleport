import { make } from 'vuex-pathify';
import _svc from '@/services/AdminService';
import { ImportType, ISoftwareImportFile, ResourceImportPath } from '@/types/Import';
import { IEaasiResource } from '@/types/Resource';
import { Store } from 'vuex';
import SoftwareImportResource from '@/models/import/SoftwareImportResource';

/*============================================================
 == State
/============================================================*/

class ImportState {
	environment: IEaasiResource = null;
	importPath: ResourceImportPath = 'Unselected';
	importStep: number = 1;
	importType: ImportType = 'software';
	software: SoftwareImportResource = new SoftwareImportResource();
	softwareFilesToUpload: ISoftwareImportFile[] = [];
}

const state = new ImportState();

/*============================================================
 == Mutations
/============================================================*/

const mutations = make.mutations(state);

mutations.RESET_IMPORT = (state) => {
	state.importStep = 0;
	state.importType = null;
	state.softwareFilesToUpload = [];
	state.importPath = 'Unselected';
	state.software = new SoftwareImportResource();
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
