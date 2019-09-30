import './register-hooks'; // Keep this import first
import Vue from 'vue';
import Router from 'vue-router';
import routes from './routes';
import { loggedInGuard, updateMeta } from './middleware';

Vue.use(Router);

const router = new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
});

router.beforeEach(loggedInGuard);
router.afterEach(updateMeta);

export default router;