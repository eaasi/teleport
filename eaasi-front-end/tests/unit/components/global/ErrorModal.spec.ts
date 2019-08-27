import {createLocalVue, shallowMount} from '@vue/test-utils';
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
		globalStore.state.isErrorModalOpen = true;

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
		globalStore.state.isErrorModalOpen = false;
	});

	it('Is not hidden', () => {
		const wrapper = shallowMount(ErrorModal, { localVue, store, });
		expect(wrapper.find('.errorModalContainer').exists()).toBe(true);
	});

	it('Displays error message', () => {
		const wrapper = shallowMount(ErrorModal, { localVue, store, });
		let errorText = wrapper.find('#debugErrorMessage').text();
		expect(errorText).toBe('Abort, Retry, Fail?');
	});

	it('Displays error info', () => {
		const wrapper = shallowMount(ErrorModal, { localVue, store, });
		let errorText = wrapper.find('#debugErrorInfo').text();
		expect(errorText).toBe('Critical Error');
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
		// @ts-ignore
		globalStore.state.isErrorModalOpen = true;
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
		globalStore.state.isErrorModalOpen = false;
	});

	it('Is not hidden', () => {
		const wrapper = shallowMount(ErrorModal, { localVue, store, });
		expect(wrapper.find('.errorModalContainer').exists()).toBe(true);
	});

	it('Displays a default error message', () => {
		const wrapper = shallowMount(ErrorModal, { localVue, store, });
		let errorText = wrapper.find('#errorMessage').text();
		expect(errorText).toContain('We\'re sorry');
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

describe('ErrorModal.vue when isErrorModalOpen false', () => {

	let store;

	beforeEach(() => {
		// Explicitly hide the modal
		globalStore.state.isErrorModalOpen = false;
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
		globalStore.state.isErrorModalOpen = false;
	});

	it('Is hidden', () => {
		const wrapper = shallowMount(ErrorModal, { localVue, store, });
		expect(wrapper.find('.errorModalContainer').exists()).toBe(false);
	});
});
