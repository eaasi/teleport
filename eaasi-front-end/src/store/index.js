import Vue from 'vue';
import Vuex from 'vuex';
import pathify from 'vuex-pathify';
import adminStore from './admin-store';
import globalStore from './global-store';
import searchStore from './search-store';
import importStore from './import-store';

pathify.options.mapping = 'simple';
pathify.options.deep = 2;

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		admin: adminStore,
		global: globalStore,
		import: importStore,
		search: searchStore
	},
	plugins: [pathify.plugin]
});
