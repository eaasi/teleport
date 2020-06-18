import BaseEnvironment from '@/models/emulation-project/BaseEnvironment';
import ContentImportResource from '@/models/import/ContentImportResource';
import SoftwareImportResource from '@/models/import/SoftwareImportResource';
import _importService from '@/services/ImportService';
import _projectService from '@/services/EmulationProjectService';
import { ICreateEnvironmentPayload, ICreateEnvironmentResponse } from '@/types/Import';
import { IEaasiResource } from '@/types/Resource';
import { IUserImportRelationRequest } from '@/types/UserImportRelation';
import { make, dispatch } from 'vuex-pathify';
import { IEmulationProject, IEmulationProjectResource } from '@/types/Emulation';
import { Store } from 'vuex';
import { resourceTypes } from '@/utils/constants';

/*============================================================
 == State
/============================================================*/

class EmulationProjectStore {
    createEnvironmentPayload: ICreateEnvironmentPayload = {
        size: '1024',
        nativeConfig: '',
        templateId: '',
    }
    selectedSoftwareId: string = null;

    chosenTemplateId: string = '';

	environment: BaseEnvironment = new BaseEnvironment();
	software: SoftwareImportResource = new SoftwareImportResource();
	content: ContentImportResource = new ContentImportResource();
	componentId: string = '';

	projectResources: IEmulationProjectResource[] = [];

	// True when we're running an environment as an Object (Content) or Software Environment
	isConstructedEnvironment: boolean = false;
	constructedTitle: string = '';

	// Parameters used to define Environment Type when snapshot is called (objectEnvironment, etc)
	environmentType: string = '';
	environmentSoftwareId: string = '';
	environmentContentId: string = '';

	project: IEmulationProject = null;
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
	state.environment = new BaseEnvironment();
};

/*============================================================
 == Actions
/============================================================*/

const actions = {

	async addResources({dispatch, state}: Store<EmulationProjectStore>, resources: IEaasiResource[]) {
		let ids = resources.filter(x => !state.projectResources.find(r => r.resourceId === x.id));
		let result = await _projectService.addResources(ids.map(r => ({
			id: undefined,
			emulationProjectId: state.project.id,
			resourceId: r.id,
			resourceType: r.resourceType
		})));
		if(!result) return;
		return await dispatch('loadProjectResources', state.project.id);
	},

	async loadProject({commit, dispatch}) {
		let project = await _projectService.getProject();
		if(!project) return;
		commit('SET_PROJECT', project);
		return await dispatch('loadProjectResources', project.id);
	},

	async loadProjectResources({commit}, projectId) {
		let resources = await _projectService.getResources(projectId);
		if(!resources) return;
		commit('SET_PROJECT_RESOURCES', resources);
	},

	async createEnvironment(_, createPayload: ICreateEnvironmentPayload): Promise<ICreateEnvironmentResponse> {
		return await _importService.createEnvironment(createPayload);
	},

	async postComponents(_, payload: any) {
		return await _importService.postComponents(payload);
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

	async createUserImportRelation(_, userImportRelationRequest: IUserImportRelationRequest) {
		return await _importService.createUserImportRelation(userImportRelationRequest);
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
