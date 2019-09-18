import { mount } from '@vue/test-utils';
import { Pagination } from '@/components/global';

describe('Pagination.vue', () => {

	it('Is displays "Records 1-1 of 1" message for single page of results', () => {
		const wrapper = mount(Pagination, {
			propsData: {
				totalResults: 1,
				resultsPerPage: 1,
				maxPages: 1,
				pageNum: 1
			},
			data() {
				return {
					numPages: 1
				};
			}
		});

		expect(wrapper.text()).toContain('Records 1-1 of 1');
	});

	it('Emits paginate when page arrow is clicked', () => {
		const wrapper = mount(Pagination, {
			propsData: {
				totalResults: 1200,
				resultsPerPage: 10,
				maxPages: 5,
				pageNum: 10
			},
			data() {
				return {
					numPages: 120,
					currentPage: 10
				};
			}
		});
		let arrow = wrapper.find('.page-arrow');
		arrow.trigger('click');
		wrapper.vm.$nextTick(() => {
			expect(wrapper.emitted('paginate')).toBeTruthy();
		});
	});

	it('Displays current records out of total number of records as label', () => {
		const wrapper = mount(Pagination, {
			propsData: {
				totalResults: 1200,
				resultsPerPage: 10,
				maxPages: 5,
				pageNum: 118
			},
			data() {
				return {
					numPages: 120,
					currentPage: 118
				};
			}
		});
		expect(wrapper.find('label').text()).toBe('Records 1170-1180 of 1200');
	});

	it('Displays current page as active', () => {
		const wrapper = mount(Pagination, {
			propsData: {
				totalResults: 1200,
				resultsPerPage: 10,
				maxPages: 5,
				pageNum: 118
			},
			data() {
				return {
					numPages: 120,
					currentPage: 118
				};
			}
		});

		// We need next tick for DOM to update after component is mounted
		wrapper.vm.$nextTick(() => {
			expect(wrapper.find('.active').text()).toBe('118');
		});
	});

	it('Displays current records out of total number of records as label', () => {
		const wrapper = mount(Pagination, {
			propsData: {
				totalResults: 1200,
				resultsPerPage: 10,
				maxPages: 5,
				pageNum: 118
			},
			data() {
				return {
					numPages: 120,
					currentPage: 118
				};
			}
		});
		expect(wrapper.find('label').text()).toBe('Records 1170-1180 of 1200');
	});

	it('Displays expected number of list items in navigation given maxPages prop', () => {
		const wrapper = mount(Pagination, {
			propsData: {
				totalResults: 1200,
				resultsPerPage: 10,
				maxPages: 5,
				pageNum: 118
			},
			data() {
				return {
					numPages: 120,
					currentPage: 118
				};
			}
		});

		// We need next tick for DOM to update after component is mounted
		wrapper.vm.$nextTick(() => {
			// There are 9 elements: maxPages (which is 5), and 4 list navigation links: <<, <, >, >>
			expect(wrapper.findAll('li').length).toBe(9);
		});
	});
});
