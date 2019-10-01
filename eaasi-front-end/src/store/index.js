import Vue from 'vue';
import Vuex from 'vuex';
import pathify from 'vuex-pathify';
import adminStore from './admin-store';
import globalStore from './global-store';
import resourceStore from './resource-store';
import softwareStore from './software-store';

pathify.options.mapping = 'simple';
pathify.options.deep = 2;

Vue.use(Vuex);

export default new Vuex.Store({
	...globalStore,
	modules: {
		admin: adminStore,
		resource: resourceStore,
		software: softwareStore
	},
	plugins: [pathify.plugin]
});
