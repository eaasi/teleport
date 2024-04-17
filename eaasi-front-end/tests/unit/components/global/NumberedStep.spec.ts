import { enableAutoDestroy, shallowMount } from '@vue/test-utils';
import NumberedStep from '@/components/global/NumberedSteps/NumberedStep.vue';

const incompleteStep =  {
	stepNumber: 8,
	description: 'Foo Bar'
};

const completeStep = {
	stepNumber: 99,
	description: 'Baz Quux'
};

enableAutoDestroy(afterEach);

describe('NumberedStep.vue', () => {
	it('When not complete => renders step number that is passed as props', () => {
		const wrapper = shallowMount(NumberedStep, {
			context: {
				props: {
					step: incompleteStep
				}
			}
		});
		expect(wrapper.find('span.step-number').text()).toBe('8');
	});

	it('When not complete => renders step description', () => {
		const wrapper = shallowMount(NumberedStep, {
			context: {
				props: {
					step: incompleteStep
				}
			}
		});
		expect(wrapper.find('span.step-description').text()).toBe('Foo Bar');
	});

	it('When complete => renders checkmark icon', () => {
		const wrapper = shallowMount(NumberedStep, {
			context: {
				props: {
					step: completeStep,
					complete: true
				}
			}
		});
		expect(wrapper.find('span.fa-check').exists()).toBe(true);
	});

	it('When complete => renders step description', () => {
		const wrapper = shallowMount(NumberedStep, {
			context: {
				props: {
					step: completeStep,
					complete: true
				}
			}
		});
		expect(wrapper.find('span.step-description').text()).toBe('Baz Quux');
	});
});
