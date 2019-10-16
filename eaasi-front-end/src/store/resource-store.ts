import { make, commit } from 'vuex-pathify';
import _svc from '@/services/ResourceService';
import { IResourceSearchQuery, IResourceSearchResponse, IResourceSearchFacet } from '@/types/Search';
import { IEaasiResource, IEnvironment } from '@/types/Resource';
import ResourceSearchQuery from '@/models/search/ResourceSearchQuery';
import { Store } from 'vuex';

/*============================================================
 == State
/============================================================*/

class ResourceState {
	activeEnvironment: IEnvironment = null;

	/**
	 * Active Resources are Selected in Explore Resources / My Resources Screen
	 */
	activeResources: IEaasiResource[] = [];

	query: IResourceSearchQuery = new ResourceSearchQuery();
	result: IResourceSearchResponse = null;
	facets: IResourceSearchFacet[] = [ // TODO: These should come from ResourceSearchResponse
		{
			name: 'Resource Types',
			values: [
				{
					label: 'Environments',
					total: 75,
					isSelected: false
				},
				{
					label: 'Software',
					total: 2,
					isSelected: false
				},
				{
					label: 'Content Environments',
					total: 0,
					isSelected: false
				},
				{
					label: 'Some Type',
					total: 13,
					isSelected: false
				},
			]
		},
		{
			name: 'Network Status',
			values: [
				{
					label: 'Private',
					total: 4,
					isSelected: false
				},
				{
					label: 'Public',
					total: 0,
					isSelected: false
				},
				{
					label: 'Remote',
					total: 73,
					isSelected: false
				},
				{
					label: 'Some Status',
					total: 73,
					isSelected: false
				}
			]
		},
		{
			name: 'Source Organization',
			values: [
				{
					label: 'Yale',
					total: 73,
					isSelected: false
				}
			]
		}
	];
}

const state = new ResourceState();

/*============================================================
 == Mutations
/============================================================*/

const mutations = make.mutations(state);

/*============================================================
 == Actions
/============================================================*/

const actions = {

	async getEnvironment(_store: Store<ResourceState>, environmentId: string) {
		return await _svc.getEnvironment(environmentId);
	},

	async searchResources({ state, commit }: Store<ResourceState>) {
		let result = await _svc.searchResources(state.query);
		if(!result) return;
		commit('SET_RESULT', {...result, facets: state.facets}); // TODO: facets should be in the result. Populate with dummy data for now
		commit('SET_QUERY', {...state.query, selectedFacets: state.facets});
		return result;
	},

	async saveEnvironment(environmentId: string) {
		return await _svc.replicateEnvironment(environmentId);
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
