import { getResourceId } from '@/helpers/ResourceHelper';
import EmulationProjectEnvironment from '@/models/emulation-project/EmulationProjectEnvironment';
import _projectService from '@/services/EmulationProjectService';
import { IEmulationProject } from '@/types/Emulation';
import { ICreateEnvironmentPayload } from '@/types/Import';
import { IEaasiResource } from '@/types/Resource';
import { Store } from 'vuex';
import { make } from 'vuex-pathify';

/*============================================================
 == State
/============================================================*/

class EmulationProjectStore {
	chosenTemplateId: string = '';
    createEnvironmentPayload: ICreateEnvironmentPayload = {
        nativeConfig: '',
		templateId: '',
		driveSettings: [],
		operatingSystemId: '',
		label: ''
    }
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
	state.createEnvironmentPayload.nativeConfig = '';
	state.createEnvironmentPayload.templateId = '';
	state.chosenTemplateId = '';
	state.selectedSoftwareId = '';
	state.environment = new EmulationProjectEnvironment();
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
