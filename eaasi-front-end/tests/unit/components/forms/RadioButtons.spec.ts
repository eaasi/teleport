import { shallowMount } from '@vue/test-utils';
import { RadioButtons } from '@/components/global/forms';

describe('RadioButtons.vue', () => {
	it('Renders label passed as prop', () => {
		const wrapper = shallowMount(RadioButtons, {
			propsData: {
				inline: true,
				name: 'foo',
				values: ['sally', 'joe'],
				value: 'sally',
				label: 'asdf'
			},
		});
		expect(wrapper.find('.eaasi-label')
			.text())
			.toBe('asdf');
	});

	it('Renders correct number of options as inputs', () => {
		const wrapper = shallowMount(RadioButtons, {
			propsData: {
				inline: true,
				name: 'foo',
				values: ['sally', 'joe'],
				value: 'sally',
				label: 'asdf'
			},
		});
		expect(wrapper.findAll('input')).toHaveLength(2);
	});

	it('Renders correct options as inputs', () => {
		const wrapper = shallowMount(RadioButtons, {
			propsData: {
				inline: true,
				name: 'foo',
				values: ['sally', 'joe'],
				value: 'sally',
				label: 'asdf'
			},
		});
		const allInputs = wrapper.findAll('input').wrappers;
		const options = [];

		for (let i = 0; i < allInputs.length; i++) {
			const val = allInputs[i].attributes().value;
			options.push(val);
		}

		const expectedOpts = ['sally', 'joe'];

		expect(expectedOpts).toEqual(options);
	});
});
