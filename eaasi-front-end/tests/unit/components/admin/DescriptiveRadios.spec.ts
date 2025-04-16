import { createLocalVue, enableAutoDestroy, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import DescriptiveRadios from '@/components/global/forms/DescriptiveRadios.vue';
import { IRadioOption } from '@/types/Forms';

const localVue = createLocalVue();
const options: IRadioOption[] = [
	{label: 'brett', description: 'favre', value: 1},
	{label: 'leroy', description: 'butler', value: 2},
	{label: 'reggie', description: 'white', value: 3}
];

localVue.use(Vuex);

enableAutoDestroy(afterEach);

describe('DescriptiveRadios.vue', () => {

	it('Displays each option', () => {
		const wrapper = shallowMount(DescriptiveRadios, {
			propsData: {
				options,
				value: 1
			}
		});
		expect(wrapper.findAll('.descriptive-radio').length).toBe(3);
	});

	it('Adds checked class to selected option', () => {
		const wrapper = shallowMount(DescriptiveRadios, {
			propsData: {
				options,
				value: 2
			}
		});
		const selected = options.find(x => x.value === 2);
		expect(wrapper.find('.checked').find('h3').text()).toBe(selected.label);
	});
});
