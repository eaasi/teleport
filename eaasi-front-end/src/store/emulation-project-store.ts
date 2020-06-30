import BaseEnvironment from '@/models/emulation-project/BaseEnvironment';
import _projectService from '@/services/EmulationProjectService';
import _importService from '@/services/ImportService';
import { IEmulationProject } from '@/types/Emulation';
import { ICreateEnvironmentPayload, ICreateEnvironmentResponse } from '@/types/Import';
import { IEaasiResource } from '@/types/Resource';
import { IUserImportRelationRequest } from '@/types/UserImportRelation';
import { Store } from 'vuex';
import { make } from 'vuex-pathify';
import { getResourceId } from '@/helpers/ResourceHelper';

/*============================================================
 == State
/============================================================*/

class EmulationProjectStore {
	chosenTemplateId: string = '';
    createEnvironmentPayload: ICreateEnvironmentPayload = {
        size: '1024',
        nativeConfig: '',
        templateId: '',
    }
	environment: BaseEnvironment = null;
	project: IEmulationProject = null;
	projectResources: IEaasiResource[] = [];
    selectedSoftwareId: string = null;
}

const state = new EmulationProjectStore();

/*============================================================
 == Mutations
/============================================================*/

const mutations = make.mutations(state);

mutations.RESET = (state) => {
	state.createEnvironmentPayload.nativeConfig = '';
	state.createEnvironmentPayload.templateId = '';
	state.chosenTemplateId = '';
	state.selectedSoftwareId = '';
	state.environment = null;
};

/*============================================================
 == Actions
/============================================================*/

const actions = {

	/* Project
	============================================*/

	async loadProject({commit, dispatch}) {
		let project = await _projectService.getProject();
		if(!project) return;
		commit('SET_PROJECT', project);
		return await dispatch('loadProjectResources', project.id);
	},

	/* Resources
	============================================*/

	async loadProjectResources({commit}, projectId) {
		let resources = await _projectService.getResources(projectId);
		if(!resources) return;
		commit('SET_PROJECT_RESOURCES', resources);
	},

	async addResources({dispatch, state}: Store<EmulationProjectStore>, resources: IEaasiResource[]) {
		let notInProject = resources.filter(r => !state.projectResources.find(pr => {
			return getResourceId(r) === getResourceId(pr);
		}));
		let result = await _projectService.addResources(notInProject.map(r => ({
			id: undefined,
			emulationProjectId: state.project.id,
			resourceId: getResourceId(r),
			resourceType: r.resourceType
		})));
		if(!result) return;
		return await dispatch('loadProjectResources', state.project.id);
	},

	async removeResource({dispatch, state}: Store<EmulationProjectStore>, resource: IEaasiResource) {
		let resourceId = getResourceId(resource);
		let result = await _projectService.removeResource(state.project.id, resourceId);
		if(!result) return;
		return await dispatch('loadProjectResources', state.project.id);
	},

};

/*============================================================
 == Getters
/============================================================*/

const getters = {
	canRunProject(): boolean {
		return true; // TODO:
	}
};

export default {
	state,
	mutations,
	actions,
	getters,
	namespaced: true
};
