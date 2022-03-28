import AttachResourceCard from '@/components/global/AttachResourceCard.vue';
import TipsCard from '@/components/global/TipsCard.vue';
import CheckboxFacet from '@/components/resources/search/CheckboxFacet.vue';
import SearchFacetModal from '@/components/resources/search/SearchFacetModal.vue';
import { VueConstructor } from 'vue';
import Alert from './Alert/Alert.vue';
import BigButton from './BigButton.vue';
import BigSectionHeading from './BigSectionHeading.vue';
import CircleButton from './CircleButton.vue';
import Collapsable from './Collapsable.vue';
import DatePicker from './DatePicker.vue';
import DateRange from './DateRange.vue';
import DualToggle from './DualToggle.vue';
import FileDropzone from './FileDropzone.vue';
import FileUploadButton from './FileUploadButton.vue';
import Autocomplete from './forms/Autocomplete.vue';
import BaseFormField from './forms/BaseFormField.vue';
import Checkbox from './forms/Checkbox.vue';
import DescriptiveRadios from './forms/DescriptiveRadios.vue';
import EaasiForm from './forms/EaasiForm.vue';
import FormModal from './forms/FormModal.vue';
import RadioButtons from './forms/RadioButtons.vue';
import SearchBar from './forms/SearchBar.vue';
import SearchSelectList from './forms/SearchSelectList.vue';
import SelectList from './forms/SelectList.vue';
import TextAreaInput from './forms/TextAreaInput.vue';
import TextInput from './forms/TextInput.vue';
import Column from './grid/Column.vue';
import Row from './grid/Row.vue';
import HoverMenu from './HoverMenu.vue';
import Loader from './Loader.vue';
import LoaderOverlay from './LoaderOverlay.vue';
import ConfirmModal from './Modal/ConfirmModal.vue';
import InfoModal from './Modal/InfoModal.vue';
import Modal from './Modal/Modal.vue';
import NumberedSteps from './NumberedSteps/NumberedSteps.vue';
import OptionsBox from './OptionsBox/OptionsBox.vue';
import Pagination from './Pagination.vue';
import SectionHeading from './SectionHeading.vue';
import SelectableCard from './SelectableCard/SelectableCard.vue';
import SmallBookmark from './SmallBookmark.vue';
import TabbedNav from './TabbedNav.vue';
import SortHeader from './tables/SortHeader.vue';
import Tag from './Tag.vue';
import TagGroup from './TagGroup.vue';
import UiButton from './UiButton.vue';
import UiChip from './UiChip.vue';
import UiNotification from './UiNotification.vue';
import ViewHeader from './ViewHeader.vue';
import DraggableCard from './DraggableCard/DraggableCard.vue';
import SelectableTextCard from './SelectableCard/SelectableTextCard.vue';
import TipsForSuccess from './TipsForSuccess.vue';

/*============================================================
 == Vue Plugin
/============================================================*/

export default {
	install(Vue: VueConstructor) {
		Vue.component('DatePicker', DatePicker);
		Vue.component('DateRange', DateRange);
		Vue.component('Alert', Alert);
		Vue.component('DualToggle', DualToggle);
		Vue.component('AttachResourceCard', AttachResourceCard);
		Vue.component('Autocomplete', Autocomplete);
		Vue.component('BaseFormField', BaseFormField);
		Vue.component('BigButton', BigButton);
		Vue.component('BigSectionHeading', BigSectionHeading);
		Vue.component('Checkbox', Checkbox);
		Vue.component('CircleButton', CircleButton);
		Vue.component('Collapsable', Collapsable);
		Vue.component('Column', Column);
		Vue.component('ConfirmModal', ConfirmModal);
		Vue.component('DescriptiveRadios', DescriptiveRadios);
		Vue.component('EaasiForm', EaasiForm);
		Vue.component('FileDropzone', FileDropzone);
		Vue.component('FileUploadButton', FileUploadButton);
		Vue.component('FormModal', FormModal);
		Vue.component('HoverMenu', HoverMenu);
		Vue.component('InfoModal', InfoModal);
		Vue.component('Loader', Loader);
		Vue.component('CheckboxFacet', CheckboxFacet);
		Vue.component('SearchFacetModal', SearchFacetModal);
		Vue.component('LoaderOverlay', LoaderOverlay);
		Vue.component('Modal', Modal);
		Vue.component('NumberedSteps', NumberedSteps);
		Vue.component('OptionsBox', OptionsBox);
		Vue.component('Pagination', Pagination);
		Vue.component('TabbedNav', TabbedNav);
		Vue.component('RadioButtons', RadioButtons);
		Vue.component('Row', Row);
		Vue.component('SearchBar', SearchBar);
		Vue.component('SectionHeading', SectionHeading);
		Vue.component('SelectableCard', SelectableCard);
		Vue.component('SelectList', SelectList);
		Vue.component('SearchSelectList', SearchSelectList);
		Vue.component('SmallBookmark', SmallBookmark);
		Vue.component('SortHeader', SortHeader);
		Vue.component('Tag', Tag);
		Vue.component('TagGroup', TagGroup);
		Vue.component('TextAreaInput', TextAreaInput);
		Vue.component('TextInput', TextInput);
		Vue.component('TipsCard', TipsCard);
		Vue.component('UiButton', UiButton);
		Vue.component('UiChip', UiChip);
		Vue.component('UiNotification', UiNotification);
		Vue.component('ViewHeader', ViewHeader);
		Vue.component('DraggableCard', DraggableCard);
		Vue.component('SelectableTextCard', SelectableTextCard);
		Vue.component('TipsForSuccess', TipsForSuccess);
	}
};

/*============================================================
 == Individual exports for testing purposes
/============================================================*/

export { Alert, CircleButton, DatePicker, DateRange, AttachResourceCard, Autocomplete, BaseFormField, BigButton, BigSectionHeading, Checkbox, Collapsable, Column, ConfirmModal, DescriptiveRadios, EaasiForm, FileDropzone, FileUploadButton, FormModal, HoverMenu, InfoModal, Loader, LoaderOverlay, Modal, NumberedSteps, OptionsBox, Pagination, TabbedNav, RadioButtons, Row, SearchBar, SectionHeading, CheckboxFacet, SearchFacetModal, SelectableCard, SelectList, SmallBookmark, SortHeader, DualToggle, Tag, TagGroup, TextAreaInput, TextInput, TipsCard, UiButton, UiChip, UiNotification, ViewHeader, SearchSelectList, DraggableCard };

