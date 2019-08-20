import { make } from 'vuex-pathify';
import _svc from '@/services/UserService';

/*============================================================
 == State
/============================================================*/

class SearchState {
	keyword: string = ''
}

const state = new SearchState();

/*============================================================
 == Mutations
/============================================================*/

const mutations = make.mutations(state);

/*============================================================
 == Actions
/============================================================*/

const actions = {

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
