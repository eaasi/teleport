import ContentImportResource from '@/models/import/ContentImportResource';
import EnvironmentImportResource from '@/models/import/EnvironmentImportResource';
import SoftwareImportResource from '@/models/import/SoftwareImportResource';
import _importService from '@/services/ImportService';
import { ICreateEnvironmentPayload, ICreateEnvironmentResponse } from '@/types/Import';
import { IUserImportRelationRequest } from '@/types/UserImportRelation';
import { Store } from 'vuex';
import { make } from 'vuex-pathify';

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
    
	environment: EnvironmentImportResource = new EnvironmentImportResource();
	software: SoftwareImportResource = new SoftwareImportResource();
	content: ContentImportResource = new ContentImportResource();
    componentId: string = '';
    
	// True when we're running an environment as an Object (Content) or Software Environment
	isConstructedEnvironment: boolean = false;
	constructedTitle: string = '';

	// Parameters used to define Environment Type when snapshot is called (objectEnvironment, etc)
	environmentType: string = '';
	environmentSoftwareId: string = '';
	environmentContentId: string = '';
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
};

/*============================================================
 == Actions
/============================================================*/

const actions = {

	/**
	 * Triggers a saveEnvironment request
	 * @param state: Store<EmulationProjectStore>
	 * @param createPayload
	 * @param importData
	 */
	async createEnvironment(_, createPayload: ICreateEnvironmentPayload): Promise<ICreateEnvironmentResponse> {
		return await _importService.createEnvironment(createPayload);
	},

	/**
	 * Triggers a POST request to components
	 * @param state: Store<EmulationProjectStore>
	 * @param createPayload
	 */
	async postComponents({ state }: Store<EmulationProjectStore>, payload: any) {
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

const getters = {};

export default {
	state,
	mutations,
	actions,
	getters,
	namespaced: true
};
