import { mount } from '@vue/test-utils';
import SlideMenu from '@/components/layout/SlideMenu.vue';

describe('SlideMenu.vue', () => {

	const menu = mount(SlideMenu, {
		propsData: {
			open: false,
			speed: 1
		}
	});

	it('renders', () => {
		expect(menu.exists()).toBe(true);
	});

	it('has a style attribute with a transition rule', () => {
		expect(menu.attributes('style')).toBe('transition: transform 1s ease-out;');
	});

	it('has an open class when opened', () => {
		menu.setProps({open: true});
		expect(menu.classes().some(x => x === 'open')).toBe(true);
	});

	it('has no open class when closed', () => {
		menu.setProps({open: false});
		expect(menu.classes().some(x => x === 'open')).toBe(false);
	});

});
