import {AttachResourceCard, DualToggle, UiButton} from '@/components/global';
import {enableAutoDestroy, mount, shallowMount} from '@vue/test-utils';

enableAutoDestroy(afterEach);

describe('DualToggle.vue', () => {
	it('Applies class of active if value matched options zero index', () => {
		const wrapper = shallowMount(DualToggle, {
			propsData: {
				value: 'Ege Bamyasi',
				options: ['Ege Bamyasi', 'Future Days']
			},
		});
		expect(wrapper.find('.dt-option').classes())
			.toContain('active');
	});

	it('Applies class of checked if value matched options first index', () => {
		const wrapper = shallowMount(DualToggle, {
			propsData: {
				value: 'Future Days',
				options: ['Ege Bamyasi', 'Future Days']
			},
		});
		expect(wrapper.find('.dual-toggle').classes())
			.toContain('checked');
	});

	it('Invokes toggle when dual-toggle div is clicked', () => {
		const toggle = jest.fn();
		const wrapper = shallowMount(DualToggle, {
			propsData: {
				value: 'slanted',
				options: ['slanted', 'enchanted']
			},
			methods: {
				toggle
			}
		});

		wrapper.find('.dual-toggle').trigger('click');
		expect(toggle).toBeCalledTimes(1);
	});

	it('Invokes toggle with input at zero index first side clicked', () => {
		const toggle = jest.fn();
		const wrapper = shallowMount(DualToggle, {
			propsData: {
				value: 'hello',
				options: ['hello', 'world']
			},
			methods: {
				toggle
			}
		});

		wrapper.find('.dt-opt1').trigger('click');
		expect(toggle).toBeCalledTimes(1);
		expect(toggle).toBeCalledWith('hello');
	});

	it('Invokes toggle with input at first index second side clicked', () => {
		const toggle = jest.fn();
		const wrapper = shallowMount(DualToggle, {
			propsData: {
				value: 'hello',
				options: ['hello', 'world']
			},
			methods: {
				toggle
			}
		});

		wrapper.find('.dt-opt2').trigger('click');
		expect(toggle).toBeCalledTimes(1);
		expect(toggle).toBeCalledWith('world');
	});

	it('Invokes emits "input" with expected when second side clicked', () => {
		const wrapper = shallowMount(DualToggle, {
			propsData: {
				value: 'hello',
				options: ['hello', 'world']
			},
		});

		wrapper.find('.dt-opt2').trigger('click');
		const expectedEmitted = {'input': [['world']]};
		expect(wrapper.emitted()).toEqual(expectedEmitted);
	});

	it('Invokes changeVal when toggle is triggered without arguments', () => {
		const changeVal = jest.fn();
		const wrapper = shallowMount(DualToggle, {
			propsData: {
				value: 'giant',
				options: ['giant', 'steps']
			},
			methods: {
				changeVal
			}
		});

		wrapper.find('.dual-toggle').trigger('click');
		expect(changeVal).toHaveBeenCalledTimes(1);
	});

	it('Emits first index options when changeVal invoked with matching value', () => {
		const wrapper = shallowMount(DualToggle, {
			propsData: {
				value: 'giant',
				options: ['giant', 'steps']
			},
		});

		wrapper.find('.dual-toggle').trigger('click');
		const expectedEmitted = {'input': [['steps']]};
		expect(wrapper.emitted()).toEqual(expectedEmitted);
	});

	it('Emits zero index options when changeVal invoked with matching value', () => {
		const wrapper = shallowMount(DualToggle, {
			propsData: {
				value: 'steps',
				options: ['giant', 'steps']
			},
		});

		wrapper.find('.dual-toggle').trigger('click');
		const expectedEmitted = {'input': [['giant']]};
		expect(wrapper.emitted()).toEqual(expectedEmitted);
	});
});
