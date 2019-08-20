import { make } from 'vuex-pathify';
import _svc from '@/services/UserService';
import { IEaasiUser } from 'eaasi-auth';
import User from '@/models/auth/User';

/*============================================================
 == State
/============================================================*/

// TODO: User should come from the server as part of the auth flow
const fakeUser = new User();
fakeUser.firstName = 'Test';
fakeUser.lastName = 'Tester';
fakeUser.roleId = 1;
fakeUser.username = 'TestTester01';

class GlobalState {
	adminMenuOpen: boolean = false;
	// TODO: This should come from the deployment config or be managed in the node admin
	nodeName: string = 'PortalMedia Inc';
	loggedInUser: IEaasiUser = fakeUser;
}

const state = new GlobalState();

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
