import { FileDropzone } from '@/components/global';
import { shallowMount } from '@vue/test-utils';

describe('FileDropZone.vue', () => {
	it('Renders "Drag File" message if limit passed as prop is 1', () => {
		const wrapper = shallowMount(FileDropzone, {
			propsData: {
				limit: 1
			},
		});
		expect(wrapper.find('.dfu-content').text()).toBe('Drag File Here To Upload');
	});

	// it('Renders "Drag Files" message if limit passed as prop is 2', () => {
	// 	const wrapper = shallowMount(FileDropzone, {
	// 		propsData: {
	// 			limit: 2
	// 		},
	// 	});
	// 	expect(wrapper.find('.dfu-content').text()).toBe('Drag Files Here To Upload');
	// });

	// it('Renders "Drag Files" message if limit passed as prop is 909090', () => {
	// 	const wrapper = shallowMount(FileDropzone, {
	// 		propsData: {
	// 			limit: 909090
	// 		},
	// 	});
	// 	expect(wrapper.find('.dfu-content').text()).toBe('Drag Files Here To Upload');
	// });
});
