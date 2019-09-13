import AlertCard from './AlertCard.vue';
import AttachResourceCard from '@/components/global/AttachResourceCard.vue';
import Autocomplete from './forms/Autocomplete.vue';
import BaseFormField from './forms/BaseFormField.vue';
import BigButton from './BigButton.vue';
import BigSectionHeading from './BigSectionHeading.vue';
import Checkbox from './forms/Checkbox.vue';
import EaasiForm from './forms/EaasiForm.vue';
import FormModal from './forms/FormModal.vue';
import HoverMenu from './HoverMenu.vue';
import LabeledUiButton from './LabeledUiButton.vue';
import Loader from './Loader.vue';
import Modal from './Modal/Modal.vue';
import NumberedSteps from './NumberedSteps/NumberedSteps.vue';
import OptionsBox from './OptionsBox/OptionsBox.vue';
import Pagination from './Pagination.vue';
import TabbedNav from './TabbedNav.vue';
import RadioButtons from './forms/RadioButtons.vue';
import SearchBar from './forms/SearchBar.vue';
import SectionHeading from './SectionHeading.vue';
import SelectableCard from './SelectableCard/SelectableCard.vue';
import SelectList from './forms/SelectList.vue';
import SmallBookmark from './SmallBookmark.vue';
import SortHeader from './tables/SortHeader.vue';
import Tag from './Tag.vue';
import TagGroup from './TagGroup.vue';
import TextAreaInput from './forms/TextAreaInput.vue';
import TextInput from './forms/TextInput.vue';
import TipsCard from '@/components/global/TipsCard.vue';
import UiButton from './UiButton.vue';
import ViewHeader from './ViewHeader.vue';
import { VueConstructor } from 'vue';

/*============================================================
 == Vue Plugin
/============================================================*/

export default {
	install(Vue: VueConstructor) {
		Vue.component('AlertCard', AlertCard);
		Vue.component('AttachResourceCard', AttachResourceCard);
		Vue.component('Autocomplete', Autocomplete);
		Vue.component('BaseFormField', BaseFormField);
		Vue.component('BigButton', BigButton);
		Vue.component('BigSectionHeading', BigSectionHeading);
		Vue.component('Checkbox', Checkbox);
		Vue.component('EaasiForm', EaasiForm);
		Vue.component('FormModal', FormModal);
		Vue.component('HoverMenu', HoverMenu);
		Vue.component('LabeledUiButton', LabeledUiButton);
		Vue.component('Loader', Loader);
		Vue.component('Modal', Modal);
		Vue.component('NumberedSteps', NumberedSteps);
		Vue.component('OptionsBox', OptionsBox);
		Vue.component('Pagination', Pagination);
		Vue.component('TabbedNav', TabbedNav);
		Vue.component('RadioButtons', RadioButtons);
		Vue.component('SearchBar', SearchBar);
		Vue.component('SectionHeading', SectionHeading);
		Vue.component('SelectableCard', SelectableCard);
		Vue.component('SelectList', SelectList);
		Vue.component('SmallBookmark', SmallBookmark);
		Vue.component('SortHeader', SortHeader);
		Vue.component('Tag', Tag);
		Vue.component('TagGroup', TagGroup);
		Vue.component('TextAreaInput', TextAreaInput);
		Vue.component('TextInput', TextInput);
		Vue.component('TipsCard', TipsCard);
		Vue.component('UiButton', UiButton);
		Vue.component('ViewHeader', ViewHeader);
	}
};

/*============================================================
 == Individual exports for testing purposes
/============================================================*/

export {
	AlertCard,
	AttachResourceCard,
	Autocomplete,
	BaseFormField,
	BigButton,
	BigSectionHeading,
	Checkbox,
	EaasiForm,
	FormModal,
	HoverMenu,
	LabeledUiButton,
	Loader,
	Modal,
	NumberedSteps,
	OptionsBox,
	Pagination,
	TabbedNav,
	RadioButtons,
	SearchBar,
	SectionHeading,
	SelectableCard,
	SelectList,
	SmallBookmark,
	SortHeader,
	Tag,
	TagGroup,
	TextAreaInput,
	TextInput,
	TipsCard,
	UiButton,
	ViewHeader
};