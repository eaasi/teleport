import { shallowMount } from '@vue/test-utils';
import NumberedStep from '@/components/global/NumberedSteps/NumberedStep.vue';
import NumberedSteps from '@/components/global/NumberedSteps/NumberedSteps.vue';
import {INumberedStep} from '@/types/NumberedStep';

import faker from 'faker';

const stubSteps = [
	{
		stepNumber: 1,
		description: faker.hacker.verb(),
		isComplete: true
	}, {
		stepNumber: 2,
		description: faker.hacker.verb(),
		isComplete: false
	}, {
		stepNumber: 3,
		description: faker.hacker.verb(),
		isComplete: true
	}, {
		stepNumber: 4,
		description: faker.hacker.verb(),
		isComplete: false
	}, {
		stepNumber: 5,
		description: faker.hacker.verb(),
		isComplete: true
	}
];

function getSteps(count: number): INumberedStep[] {
	return stubSteps.slice(0, count);
}


describe('NumberedSteps.vue', () => {
	it('When 0 steps passed as props => renders 3 Numbered Step components', () => {
		const wrapper = shallowMount(NumberedSteps, { propsData: {
			steps: []
		}});
		expect(wrapper.findAll(NumberedStep).exists()).toBe(false);
	});

	it('When 1 step passed as props => renders 3 Numbered Step components', () => {
		const testSteps = getSteps(1);
		const wrapper = shallowMount(NumberedSteps, { propsData: {
			steps: testSteps
		}});
		expect(wrapper.findAll(NumberedStep).length).toBe(1);
	});

	it('When 3 steps passed as props => renders 3 Numbered Step components', () => {
		const testSteps = getSteps(3);
		const wrapper = shallowMount(NumberedSteps, { propsData: {
			steps: testSteps
		}});
		expect(wrapper.findAll(NumberedStep).length).toBe(3);
	});

	it('When 5 steps passed as props => renders 3 Numbered Step components', () => {
		const testSteps = getSteps(5);
		const wrapper = shallowMount(NumberedSteps, { propsData: {
			steps: testSteps
		}});
		expect(wrapper.findAll(NumberedStep).length).toBe(5);
	});
});
