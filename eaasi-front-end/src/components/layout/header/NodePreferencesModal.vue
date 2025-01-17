<template>
	<form-modal
		ref="_form"
		size="sm"
		title="Keyboard Preferences"
		@save="saveKeyboardSettings"
		@close="cancel"
		@click:cancel="cancel"
		class="node-preferences-modal"
	>
		<h4 class="uppercase medium">Set local keyboard layout and language</h4>
		<p>
			In order to map between user and emulator keys, we need to know the local keyboard model and language settings.
		</p>
		<p>
			Please select the language of your keyboard input and the keyboard model. If unsure select pc-105 (a standard windows keyboard).
		</p>
		<search-select-list
			style="margin-top: 1rem;"
			v-model="selectedKeyboardLanguage"
			label="Choose language"
			option-label="description"
			anchor="name"
			placeholder="Select a language"
			:data="keyboardLanguages"
			rules="required"
		/>
		<search-select-list
			style="margin-top: 1rem;"
			v-model="selectedKeyboardLayout"
			label="Choose keyboard layout"
			option-label="description"
			anchor="name"
			placeholder="Select a keyboard layout"
			:data="keyboardLayouts"
			rules="required"
		/>
	</form-modal>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { EaasiForm } from '@/components/global';
/*import { generateNotificationSuccess } from '@/helpers/NotificationHelper';*/
import eventBus from '@/utils/event-bus';
import { IKeyboardLanguage, IKeyboardLayout, IKeyboardSettings } from 'eaasi-admin';

const kbLayouts = require('../../../assets/json/kbLayouts.json');

@Component({
	name: 'NodePreferencesModal'
})
export default class NodePreferencesModal extends Vue {

	$refs!: {
		_form: EaasiForm
	};

	/* Props
	============================================*/

	/* Computed
	============================================*/
	get keyboardLanguages(): IKeyboardLanguage[] {
		return this.kbLayouts.languages;
	}

	get keyboardLayouts(): IKeyboardLayout[] {
		return this.kbLayouts.layouts;
	}

	get disabled(): boolean {
		return !this.selectedKeyboardLanguage || !this.selectedKeyboardLayout;
	}

	/* Data
	============================================*/
	readonly kbLayouts = kbLayouts;
	selectedKeyboardLanguage: string = null;
	selectedKeyboardLayout: string = null;

	/* Methods
	============================================*/
	cancel() {
		this.selectedKeyboardLanguage = null;
		this.selectedKeyboardLayout = null;
		this.$emit('close');
	}

	async saveKeyboardSettings() {
		const language = this.keyboardLanguages.find(language => language.name === this.selectedKeyboardLanguage);
		const layout = this.keyboardLayouts.find(layout => layout.name === this.selectedKeyboardLayout);
		const payload: IKeyboardSettings = {language, layout};
		await this.$store.dispatch('admin/setKeyboardSettings', payload);
		/*const notification = generateNotificationSuccess('Keyboard Settings saved successfully.');
		eventBus.$emit('notification:show', notification);*/
	}

	async init() {
		const keyboardSettings: IKeyboardSettings = await this.$store.dispatch('admin/getKeyboardSettings');
		if (keyboardSettings && keyboardSettings.language && keyboardSettings.layout) {
			this.selectedKeyboardLanguage = keyboardSettings.language.name;
			this.selectedKeyboardLayout = keyboardSettings.layout.name;
		}
	}

	/* Lifecycle Hooks
	============================================*/

	beforeMount() {
		this.init();
	}
}

</script>

<style lang="scss">

.node-preferences-modal {
	.eaasi-modal-content {
		overflow-y: unset;
	}
}

</style>