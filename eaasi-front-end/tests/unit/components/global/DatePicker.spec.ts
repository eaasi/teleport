import { enableAutoDestroy, mount } from '@vue/test-utils';
import fecha from 'fecha';
import DatePicker from '../../../../src/components/global/DatePicker.vue';

enableAutoDestroy(afterEach);

describe('Vue date pick', () => {

    it('emits correct input on date select', async () => {

        const wrapper = mount(DatePicker, {
            propsData: {value: '2017-12-29', displayFormat: 'DD.MM.YYYY'}
        }) as any;;

        await wrapper.vm.open();
        wrapper.find('td[data-id="2017-12-30"]').trigger('click');
        wrapper.find('input').setValue('31.12.2017');

        await wrapper.vm.close();

        expect(wrapper.emitted().input).toEqual([
            ['2017-12-30'],
            ['2017-12-31']
        ]);

    });

    it('can use alternate parsing engine', async () => {

        const wrapper = mount(DatePicker, {propsData: {
            value: '2017-12-29 05:30',
            format: 'YYYY-MM-DD HH:mm',
            displayFormat: 'DD.MM.YYYY [at] HH:mm',
            parseDate(dateString, format) {
                return fecha.parse(dateString, format);
            },
            formatDate(date, format) {
                return fecha.format(date, format);
            }
        }}) as any;

        expect(wrapper.find('input').element.value).toEqual('29.12.2017 at 05:30');

        await wrapper.vm.open();
        wrapper.find('td[data-id="2017-12-30"]').trigger('click');

        expect(wrapper.emitted().input).toEqual([
            ['2017-12-30 05:30']
        ]);

    });

    it('can function as time picker', async () => {

        const wrapper = mount(DatePicker, {
            propsData: {
                value: '2017-12-29 5:30:00',
                format: 'YYYY-MM-DD HH:mm:ss',
                pickTime: true,
                pickMinutes: true,
                pickSeconds: true
            }
        }) as any;

        await wrapper.vm.open();
        wrapper.find('.vdpHoursInput').setValue('6');
        wrapper.find('.vdpMinutesInput').setValue('15');
        wrapper.find('.vdpHoursInput').setValue('24');
        wrapper.find('.vdpHoursInput').setValue('-1');

        expect(wrapper.emitted().input).toEqual([
            ['2017-12-29 06:30:00'],
            ['2017-12-29 06:15:00'],
            ['2017-12-29 23:15:00'],
            ['2017-12-29 00:15:00']
        ]);

    });

    it('disables dates correctly', async () => {

        const wrapper = mount(DatePicker, {
            propsData: {
                value: '2017-12-29',
                isDateDisabled: function(date) {
                    const refDate = new Date('2017-12-29');
                    return date > refDate;
                }
            }
        }) as any;

        await wrapper.vm.open();

        expect(wrapper.find('td[data-id="2017-12-30"]').classes()).toContain('disabled');

        await wrapper.find('td[data-id="2017-12-30"]').trigger('click');

        expect(wrapper.emitted().input);

    });

    it('starts week on monday', async () => {

        const wrapper = mount(DatePicker, {
            propsData: {
                value: '2017-12-29'
            }
        }) as any;

        await wrapper.vm.open();

        expect(wrapper.find('.vdpHeadCell:first-of-type span').text().trim()).toEqual('Mon');
        expect(wrapper.find('.vdpHeadCell:last-of-type span').text().trim()).toEqual('Sun');
    });

    it('can start week on sunday', async () => {

        const wrapper = mount(DatePicker, {
            propsData: {
                value: '2017-12-29',
                startWeekOnSunday: true
            }
        }) as any;

        await wrapper.vm.open();

        expect(wrapper.find('.vdpHeadCell:first-of-type span').text().trim()).toEqual('Sun');
        expect(wrapper.find('.vdpHeadCell:last-of-type span').text().trim()).toEqual('Sat');

        // Change year and assert again
        await wrapper.setProps({value: '2018-12-29'});

        expect(wrapper.find('.vdpHeadCell:first-of-type span').text().trim()).toEqual('Sun');
        expect(wrapper.find('.vdpHeadCell:last-of-type span').text().trim()).toEqual('Sat');
    });

    it('sets selected cells', async () => {

        const wrapper = mount(DatePicker) as any;
        await wrapper.vm.open();

        expect(wrapper.find('td.selected').exists());

        expect(wrapper.vm.isValidValue); // vue test utils sync bug

        await wrapper.setProps({value: '2017-12-29'});

        expect(wrapper.find('td[data-id="2017-12-29"]').classes()).toContain('selected');

        wrapper.destroy();

    });

    it('switches periods correctly', async () => {

        const wrapper = mount(DatePicker, {
            propsData: {value: '2017-12-29'}
        }) as any;

        await wrapper.vm.open();
        await wrapper.find('.vdpArrowNext').trigger('click');

        expect( wrapper.findAll('.vdpPeriodControl > button').wrappers.map(
            buttonWrap => buttonWrap.element.textContent.trim()
        ).join(' ')).toEqual('January 2018');

    });

    it('closes floater on outside click', async () => {

        const wrapper = mount(DatePicker) as any;

        await wrapper.vm.open();

        expect(wrapper.vm.opened).toEqual(true);

        await document.querySelector('body').click();

        expect(wrapper.vm.opened).toEqual(false);

    });

    it('closes floater on escape press', async () => {

        const wrapper = mount(DatePicker) as any;

        await wrapper.vm.open();

        const event = new Event('keyup');
        document.dispatchEvent(event);

        expect(wrapper.vm.opened);

    });

    it('tolerates invalid user input', () => {

        const wrapper = mount(DatePicker);

        wrapper.find('input').setValue('2017-12');
        wrapper.find('input').setValue('2017-1229');

        expect(wrapper.emitted().input).toEqual([
            ['2017-12'],
            ['2017-1229']
        ]);

    });

});