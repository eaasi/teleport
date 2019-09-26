// This file registers component-level vue-router route guards so they work in class components
// See https://github.com/vuejs/vue-class-component/issues/193 for more details

import Component from 'vue-class-component';

Component.registerHooks([
	'beforeRouteEnter',
	'beforeRouteLeave',
	'beforeRouteUpdate'
]);