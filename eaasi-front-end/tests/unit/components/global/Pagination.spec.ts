import { mount } from '@vue/test-utils';
import { Pagination } from '@/components/global';

describe('Pagination.vue', () => {

	it('Is has no content if numPages is not greater than 1', () => {
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

		expect(wrapper.html()).toBe(undefined);
	});

	it('Emits paginate when page arrow is clicked', () => {
		const wrapper = mount(Pagination, {
			propsData: {
				totalResults: 1200,
				resultsPerPage: 10,
				maxPages: 5,
				pageNum: 120
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
});
