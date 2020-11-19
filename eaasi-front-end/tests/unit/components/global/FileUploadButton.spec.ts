import { FileUploadButton, UiButton } from '@/components/global';
import { mount } from '@vue/test-utils';

describe('FileUploadButton.vue', () => {
	it('Renders buttonLabel passed as prop', () => {
		const wrapper = mount(FileUploadButton, {
			propsData: {
				buttonLabel: 'emerson'
			},
			components: {
				UiButton
			}
		});
		expect(wrapper.find('button').text()).toBe('emerson');
	});

	it('Renders icon passed as prop', () => {
		const wrapper = mount(FileUploadButton, {
			propsData: {
				icon: 'thoreau'
			},
			components: {
				UiButton
			}
		});
		expect(wrapper.find('.fas').classes()).toContain('fa-thoreau');
	});

	it('Sets accepted filetype passed as prop', () => {
		const wrapper = mount(FileUploadButton, {
			propsData: {
				accept: 'alcott'
			},
			components: {
				UiButton
			}
		});
		expect(wrapper.find('input').attributes()['accept']).toEqual('alcott');
	});

	it('Sets accepted filetype as */* if no accept prop used', () => {
		const wrapper = mount(FileUploadButton, {
			propsData: {
				icon: 'fuller'
			},
			components: {
				UiButton
			}
		});
		expect(wrapper.find('input').attributes()['accept']).toEqual('*/*');
	});

	it('Sets inputName to files[] if limit prop is greater than 1', () => {
		const wrapper = mount(FileUploadButton, {
			propsData: {
				limit: 2
			},
			components: {
				UiButton
			}
		});
		expect(wrapper.find('input').attributes()['name']).toEqual('files[]');
	});

	it('Sets inputName to file if limit prop is 1', () => {
		const wrapper = mount(FileUploadButton, {
			propsData: {
				limit: 1
			},
			components: {
				UiButton
			}
		});
		expect(wrapper.find('input').attributes()['name']).toEqual('files');
	});

	it('Sets class to light-blue if secondary passed as prop is true', () => {
		const wrapper = mount(FileUploadButton, {
			propsData: {
				secondary: true
			},
			components: {
				UiButton
			}
		});
		expect(wrapper.find('button').classes()).toContain('light-blue');
	});

	it('Sets class to white if secondary passed as prop is false', () => {
		const wrapper = mount(FileUploadButton, {
			propsData: {
				secondary: false
			},
			components: {
				UiButton
			}
		});
		expect(wrapper.find('button').classes()).toContain('white');
	});

	it('invokes changeFiles on input change event', () => {
		const changeFiles = jest.fn();
		const wrapper = mount(FileUploadButton, {
			propsData: {
				secondary: false
			},
			components: {
				UiButton
			},
			methods: {
				changeFiles
			}
		});
		wrapper.find('input').trigger('change');
		expect(changeFiles).toBeCalled();
	});

	it('builds id data as 9 character string', () => {
		const wrapper = mount(FileUploadButton, {
			components: {
				UiButton
			},
		});
		expect(wrapper.vm.$data.id.length).toBe(10);
	});
});
