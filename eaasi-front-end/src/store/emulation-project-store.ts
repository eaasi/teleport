import { filterResourcesByType, getResourceId, getResourceArchiveId, removeResourcesByType } from '@/helpers/ResourceHelper';
import EmulationProjectEnvironment from '@/models/emulation-project/EmulationProjectEnvironment';
import _projectService from '@/services/EmulationProjectService';
import { IEmulationProject } from '@/types/Emulation';
import {ICreateEnvironmentPayload, ICreateEnvironmentResponse} from '@/types/Import';
import { IEaasiResource, IEnvironment, ResourceType } from '@/types/Resource';
import { IEaasiTaskSuccessor } from '@/types/Task';
import { resourceTypes } from '@/utils/constants';
import { Store } from 'vuex';
import { dispatch, make } from 'vuex-pathify';
import { EmulationProjectMode } from '@/types/EmulationProject';
import _importService from '@/services/ImportService';
import _resourceService from '@/services/ResourceService';
import eventBus from '@/utils/event-bus';
import { generateNotificationError } from '@/helpers/NotificationHelper';

/*============================================================
 == State
/============================================================*/

class EmulationProjectStore {
	mode: EmulationProjectMode = null;
	selectingResourceTypes: ResourceType[] = [];
	chosenTemplateId: string = '';
    createEnvironmentPayload: ICreateEnvironmentPayload = null;
	environment: EmulationProjectEnvironment = null;
	project: IEmulationProject = null;
	projectResources: IEaasiResource[] = [];
	selectedResources: IEaasiResource[] = [];
    selectedSoftwareId: string = null;
	selectedResourcesPerDrive: IEaasiResource[][] = [];
	selectedTemplateId: string = null;
}

const state = new EmulationProjectStore();

/*============================================================
 == Mutations
/============================================================*/

const mutations = make.mutations(state);

mutations.RESET = (state) => {
	state.chosenTemplateId = '';
	state.selectedSoftwareId = '';
	state.environment = null;
	state.selectedResources = [];
	state.projectResources = [];
};

mutations.REMOVE_RESOURCE_FROM_ENVIRONMENT = (state: EmulationProjectStore, resourceId: string) => {
	if (state.environment && state.environment.envId === resourceId) {
		state.environment = null;
		return;
	}
	if (state.environment && state.environment.drives) {
		state.environment.drives = state.environment.drives.map(
			drive => drive.objectId == resourceId ? {...drive, objectId: null, objectArchive: null} : drive
		);
	}
};

mutations.REMOVE_SELECTED_RESOURCE = (state: EmulationProjectStore, resourceId: string) => {
	if (state.environment && state.environment.envId === resourceId) state.environment = null;
	state.selectedResources = state.selectedResources.filter(sr => sr.id != resourceId && sr.envId != resourceId);
};

/*============================================================
 == Actions
/============================================================*/

const actions = {

	/* Project
	============================================*/

	async loadProject({ commit, dispatch, rootState }) {
		const project = await _projectService.getProject(rootState.loggedInUser.id);
		if(!project) return;
		commit('SET_PROJECT', project);
		return await dispatch('loadProjectResources', project.id);
	},

	/* Resources
	============================================*/

	async loadProjectResources({ commit }, projectId: number) {
		const resources = await _projectService.getResources(projectId);
		if(!resources) return;
		commit('SET_PROJECT_RESOURCES', resources);
	},

	async addResources({ dispatch, state }: Store<EmulationProjectStore>, resources: IEaasiResource[]) {
		if (!state.project) {
			await dispatch('loadProject');
		}
		const notInProject = resources.filter(r => !state.projectResources.find(pr => {
			return getResourceId(r) === getResourceId(pr);
		}));
		const result = await _projectService.addResources(notInProject.map(r => ({
			id: undefined,
			emulationProjectId: state.project.id,
			archiveId: getResourceArchiveId(r),
			resourceId: getResourceId(r),
			resourceType: r.resourceType
		})));
		if (!result) return;
		return await dispatch('loadProjectResources', state.project.id);
	},

	async removeResource({ dispatch, state, commit }: Store<EmulationProjectStore>, resource: IEaasiResource) {
		const resourceId = getResourceId(resource);
		const result = await _projectService.removeResource(state.project.id, resourceId);
		if (!result) return;
		commit('REMOVE_SELECTED_RESOURCE', resourceId);
		commit('REMOVE_RESOURCE_FROM_ENVIRONMENT', resourceId);
		return await dispatch('loadProjectResources', state.project.id);
	},

	async removeResourcesOfType({ dispatch, commit, state }, resourceTypeList: ResourceType[]) {
		const result = await _projectService.removeResourcesOfType(state.project.id, resourceTypeList);
		if (!result) return;
		const resourcesToRemove = state.projectResources.filter(
			sr => resourceTypeList.some(type => type === sr.resourceType)
		);
		if (resourcesToRemove.length > 0) {
			resourcesToRemove.forEach(resource => {
				const resourceId: string = resource.id && resource.envId;
				commit('REMOVE_SELECTED_RESOURCE', resourceId);
				commit('REMOVE_RESOURCE_FROM_ENVIRONMENT', resourceId);
			});
		}
		if (resourceTypeList.some(resourceType => resourceType === resourceTypes.ENVIRONMENT)) {
			commit('RESET');
		}
		return await dispatch('loadProjectResources', state.project.id);
	},

	async clearAll({ commit, state }): Promise<boolean> {
		const result = await _projectService.clearAll(state.project.id);
		if (!result) return false;
		commit('RESET');
		await dispatch('loadProject');
		await dispatch('loadProjectResources', state.project.id);
		return true;
	},

	async addTaskSuccessor({ rootState }, payload): Promise<IEaasiTaskSuccessor> {
		payload.userId = rootState.loggedInUser.id;
		return await _projectService.addTaskSuccessor(payload);
	},

	async saveBaseEnvironment({ commit, state }): Promise<EmulationProjectEnvironment | null> {
		if (!state.createEnvironmentPayload) {
			return null;
		}
		if (state.environment) {
			return state.environment;
		}
		const response = await _importService.createEnvironment(state.createEnvironmentPayload);
		if (!response || !response.id) {
			eventBus.$emit('notification:show', generateNotificationError(`Having troubles creating ${state.createEnvironmentPayload.label} environment, please try again.`));
			return null;
		}
		const baseEnv: IEnvironment = await _resourceService.getEnvironment(response.id);
		const emulationProjectEnv = new EmulationProjectEnvironment(baseEnv);
		commit('SET_ENVIRONMENT', emulationProjectEnv);
		return emulationProjectEnv;
	},

};

/*============================================================
 == Getters
/============================================================*/

const getters = {
	canRunProject(state): boolean {
		return state.environment != null || state.createEnvironmentPayload != null;
	},
	constructedFromBaseEnvironment(state): boolean {
		return state.createEnvironmentPayload != null;
	},
	projectEnvironments(state): IEnvironment[] {
		return filterResourcesByType(state.projectResources, resourceTypes.ENVIRONMENT) as IEnvironment[];
	},
	projectObjects(state) {
		return removeResourcesByType(state.projectResources, resourceTypes.ENVIRONMENT);
	},
	selectedObjects(state: EmulationProjectStore): IEaasiResource[] {
		return state.selectedResources.filter(r => r.resourceType !== resourceTypes.ENVIRONMENT);
	},
	isObjectEnvironment(state: EmulationProjectStore): boolean {
		const selectedObjects = getters.selectedObjects(state);
		return selectedObjects.length > 0 && selectedObjects.every(object => object.resourceType === resourceTypes.CONTENT);
	}
};

export default {
	state,
	mutations,
	actions,
	getters,
	namespaced: true
};
