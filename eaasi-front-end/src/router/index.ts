import Vue from 'vue';
import Router from 'vue-router';
import { loggedInGuard, updateMeta } from './middleware';
import './register-hooks'; // Keep this import first
import routes from './routes';
import config from '@/config';

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err);
};

Vue.use(Router);

const router = new Router({
	mode: 'history',
	base: config.BASE_URL,
	routes
});

router.beforeEach(loggedInGuard);
router.afterEach(updateMeta);

export default router;