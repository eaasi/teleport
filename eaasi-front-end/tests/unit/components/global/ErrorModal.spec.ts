import {createLocalVue, mount, shallowMount} from '@vue/test-utils';
import ErrorModal from '@/components/global/Modal/ErrorModal.vue';

import Vuex from 'vuex';
import pathify from 'vuex-pathify';
import globalStore from '@/store/global-store';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('ErrorModal.vue when showDebugErrors is true', () => {

	let store;

	beforeEach(() => {
		// Show the modal, force showDebugErrors => true
		// @ts-ignore
		globalStore.state.showDebugErrors = true;

		globalStore.state.appError = {
			message: 'Abort, Retry, Fail?',
			info: 'Critical Error'
		};

		store = new Vuex.Store({
			actions: {},
			modules: {
				// @ts-ignore
				global: globalStore
			},
			plugins: [pathify.plugin]
		});
	});

	afterAll(() => {
		// @ts-ignore
		globalStore.state.showDebugErrors = false;
		globalStore.state.appError = null;
	});

	it('Is not hidden', () => {
		const wrapper = shallowMount(ErrorModal, { localVue, store, });
		expect(wrapper.find('.error-modal-container').exists()).toBe(true);
	});

	it('Displays error heading', () => {
		const wrapper = mount(ErrorModal, { localVue, store, });
		let errorText = wrapper.find('.eaasi-info-modal-title > h2');
		expect(errorText.text()).toContain('An Error Has Occurred');
	});

	it('Displays message that developers have been notified', () => {
		const wrapper = mount(ErrorModal, { localVue, store, });
		let errorText = wrapper.find('#defaultErrorMessage > p');
		expect(errorText.text()).toContain('Our developers have been automatically notified');
	});

	it('Does not show default error message', () => {
		const wrapper = shallowMount(ErrorModal, { localVue, store, });
		let friendlyErrorMessage = wrapper.find('#errorMessage');
		expect(friendlyErrorMessage.exists()).toBe(false);
	});
});

describe('ErrorModal.vue when showDebugErrors is false', () => {

	let store;

	beforeEach(() => {
		// Show the modal
		globalStore.state.appError = {
			message: 'Abort, Retry, Fail?',
			info: 'Critical Error'
		};

		store = new Vuex.Store({
			actions: {},
			modules: {
				// @ts-ignore
				global: globalStore
			},
			plugins: [pathify.plugin]
		});
	});

	afterAll(() => {
		// @ts-ignore
		globalStore.state.showDebugErrors = false;
		globalStore.state.appError = null;
	});

	it('Is not hidden', () => {
		const wrapper = shallowMount(ErrorModal, { localVue, store, });
		expect(wrapper.find('.error-modal-container').exists()).toBe(true);
	});

	it('Displays a default error message', () => {
		const wrapper = shallowMount(ErrorModal, { localVue, store, });
		let errorText = wrapper.find('#defaultErrorMessage').text();
		expect(errorText).toContain('developers have been automatically notified');
	});

	it('Does not show debug error message', () => {
		const wrapper = shallowMount(ErrorModal, { localVue, store, });
		expect(wrapper.find('#debugErrorMessage').exists()).toBe(false);
	});

	it('Does not show debug error info', () => {
		const wrapper = shallowMount(ErrorModal, { localVue, store, });
		expect(wrapper.find('#debugErrorInfo').exists()).toBe(false);
	});
});

describe('ErrorModal.vue when appError is null', () => {

	let store;

	beforeEach(() => {
		// Explicitly hide the modal
		globalStore.state.appError = null;

		store = new Vuex.Store({
			actions: {},
			modules: {
				// @ts-ignore
				global: globalStore
			},
			plugins: [pathify.plugin]
		});
	});

	afterAll(() => {
		// @ts-ignore
		globalStore.state.showDebugErrors = false;
		globalStore.state.appError = null;
	});

	it('Is hidden', () => {
		const wrapper = shallowMount(ErrorModal, { localVue, store, });
		expect(wrapper.find('.errorModalContainer').exists()).toBe(false);
	});
});
