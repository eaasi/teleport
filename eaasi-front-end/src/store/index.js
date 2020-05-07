import Vue from 'vue';
import Vuex from 'vuex';
import pathify from 'vuex-pathify';
import adminStore from './admin-store';
import globalStore from './global-store';
import importStore from './import-store';
import resourceStore from './resource-store';
import softwareStore from './software-store';
import bookmarkStore from './bookmark-store';
import taskStore from './task-store';
import emulationProjectStore from './emulation-project-store';

pathify.options.mapping = 'simple';
pathify.options.deep = 2;

Vue.use(Vuex);

export default new Vuex.Store({
	...globalStore,
	modules: {
		admin: adminStore,
		software: softwareStore,
		import: importStore,
		resource: resourceStore,
		bookmark: bookmarkStore,
		task: taskStore,
		emulationProject: emulationProjectStore,
	},
	plugins: [pathify.plugin]
});
