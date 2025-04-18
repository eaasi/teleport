/*============================================================
 == State
/============================================================*/

import EmulatorImportRequest from '@/models/admin/EmulatorImportRequest';
import User from '@/models/admin/User';
import EaasiSearchQuery from '@/models/http/EaasiSearchQuery';
import { IEaasiSearchQuery, IEaasiSearchResponse } from '@/types/Search';
import { IEaasiRole, IEmulator, IEmulatorEntry, IKeyboardSettings } from 'eaasi-admin';
import { Store } from 'vuex';
import { make } from 'vuex-pathify';

export class AdminState {
	activeEmulator: IEmulator = null;
	activeUser: User = null;
	emulators: IEmulator[] = null;
	usersResult: IEaasiSearchResponse<User> = null;
	usersQuery: IEaasiSearchQuery = new EaasiSearchQuery();
	roles: IEaasiRole[] = [];
	apiKey: string = '';
}

const state = new AdminState();

/*============================================================
 == Mutations
/============================================================*/

const mutations = make.mutations(state);

/*============================================================
 == Actions
/============================================================*/

const actions = {

	/* Emulators
	============================================*/

	getEmulators({ commit }: Store<AdminState>) {
		console.log('getEmulators');
	},

	importEmulator(_: Store<AdminState>, req: EmulatorImportRequest) {
		console.log('importEmulator');
	},

	setDefaultEmulatorVersion(_: Store<AdminState>, entry: IEmulatorEntry) {
		console.log('setDefaultEmulatorVersion');
	},

	/* Users
	============================================*/

	getUsers({ commit, state }: Store<AdminState>) {
		console.log('getUsers');
	},

	saveUser(_store: Store<AdminState>, user: User) {
		console.log('saveUser');
	},

	deleteUser(_store: Store<AdminState>, userId: string)  {
	},

	getRoles({ commit }: Store<AdminState>) {
		console.log('getRoles');
	},

	resetPassword(_, email: string) {
		console.log('resetPassword');
	},

	/* Tasks
	============================================*/
	getTaskState(_, taskId: string) {
		console.log('getTaskState');
	},

	/* Error Logs
	============================================*/
	getErrorLogs(_) {
		console.log('getErrorLogs');
	},

	getMostRecentErrorLogs(_) {
		console.log('getMostRecentErrorLogs');
	},

	/*
	Node Preferences
	============================================*/
	getKeyboardSettings(_) {
		console.log('getKeyboardSettings');
	},

	setKeyboardSettings(_, keyboardSettings: IKeyboardSettings) {
		console.log('setKeyboardSettings');
	},

	getApiKey({ commit }: Store<AdminState>) {
		console.log('getApiKey');
	},

	getBEBuildVersion(){
		return '';
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