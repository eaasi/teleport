import { SearchSelectList } from '@/components/global/forms';
import { enableAutoDestroy, shallowMount } from '@vue/test-utils';

enableAutoDestroy(afterEach);

describe('SearchSelectList.vue', () => {

	it('should show select list for search query', () => {
		const wrapper = shallowMount(SearchSelectList, {
			propsData: {
                optionLabel: 'city',
                anchor: 'id',
                placeholder: 'select a city',
                value: '',
                data: [
                    {
                        id: 1,
                        city: 'Paris'
                    },
                    {
                        id: 2,
                        city: 'New York'
                    },
                    {
                        id: 3,
                        city: 'Barcelona'
                    }
                ]
			},
        });

        wrapper.setData({ query: 'pa', showList: true });
        expect(wrapper.find('.select-list').exists()).toBe(true);
        expect(wrapper.find('No Result').exists()).toBe(false);
    });

    it('should emit @input event with selected property[anchor] value', async () => {
		const wrapper = shallowMount(SearchSelectList, {
			propsData: {
                optionLabel: 'city',
                anchor: 'id',
                placeholder: 'select a city',
                value: '',
                data: [
                    {
                        id: 1,
                        city: 'Paris'
                    },
                    {
                        id: 2,
                        city: 'New York'
                    },
                    {
                        id: 3,
                        city: 'Barcelona'
                    }
                ]
			},
        });

        wrapper.setData({ query: 'pa', showList: true });
        wrapper.vm.$emit('input', 'Paris');

        wrapper.vm.$nextTick(() => {
            expect(wrapper.emitted('input')).toBeTruthy();
            expect(wrapper.emitted('input').length).toBe(1);
        });

    });

});
