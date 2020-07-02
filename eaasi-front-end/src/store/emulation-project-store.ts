import { filterResourcesByType, getResourceId, removeResourcesByType } from '@/helpers/ResourceHelper';
import EmulationProjectEnvironment from '@/models/emulation-project/EmulationProjectEnvironment';
import _projectService from '@/services/EmulationProjectService';
import { IEmulationProject } from '@/types/Emulation';
import { ICreateEnvironmentPayload } from '@/types/Import';
import { IEaasiResource, IEnvironment } from '@/types/Resource';
import { resourceTypes } from '@/utils/constants';
import { Store } from 'vuex';
import { make } from 'vuex-pathify';

/*============================================================
 == State
/============================================================*/

class EmulationProjectStore {
	chosenTemplateId: string = '';
    createEnvironmentPayload: ICreateEnvironmentPayload = null;
	environment: EmulationProjectEnvironment = null;
	project: IEmulationProject = null;
	projectResources: IEaasiResource[] = [];
	selectedResources: IEaasiResource[] = [];
    selectedSoftwareId: string = null;
}

const state = new EmulationProjectStore();

/*============================================================
 == Mutations
/============================================================*/

const mutations = make.mutations(state);

mutations.RESET = (state) => {
	state.createEnvironmentPayload = null;
	state.chosenTemplateId = '';
	state.selectedSoftwareId = '';
	state.environment = null;
	state.selectedResources = [];
};

mutations.REMOVE_SELECTED_RESOURCE = (state: EmulationProjectStore, resourceId: string) => {
	if (state.environment && state.environment.envId === resourceId) state.environment = null;
	state.selectedResources = state.selectedResources.filter(sr => sr.id != resourceId || sr.envId != resourceId);
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

	async removeResource({dispatch, state, commit}: Store<EmulationProjectStore>, resource: IEaasiResource) {
		let resourceId = getResourceId(resource);
		let result = await _projectService.removeResource(state.project.id, resourceId);
		if(!result) return;
		commit('REMOVE_SELECTED_RESOURCE', resourceId);
		return await dispatch('loadProjectResources', state.project.id);
	},

};

/*============================================================
 == Getters
/============================================================*/

const getters = {
	canRunProject(): boolean {
		return true; // TODO:
	},
	constructedFromBaseEnvironment(state) {
		state.createEnvironmentPayload != null;
	},
	projectEnvironments(state): IEnvironment[] {
		return filterResourcesByType(state.projectResources, resourceTypes.ENVIRONMENT) as IEnvironment[];
	},
	projectObjects(state) {
		return removeResourcesByType(state.projectResources, resourceTypes.ENVIRONMENT);
	}
};

export default {
	state,
	mutations,
	actions,
	getters,
	namespaced: true
};
