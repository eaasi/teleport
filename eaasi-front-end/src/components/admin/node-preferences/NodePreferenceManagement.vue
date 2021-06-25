<template>
	<div id="nodePreferenceSection">
		<div class="rtl-header padded-xl">
			<div class="container-xs">
				<div class="flex-row justify-between">
					<h1>Keyboard Preferences</h1>
				</div>
			</div>
		</div>
		<div class="padded-xl container-xs">
			<h4 class="uppercase medium">Set local keyboard layout and language</h4>
			<p>
				In order to map between user and emulator keys, we need to know the local keyboard model and language settings.
			</p>
			<p>
				Please select the language of your keyboard input and the keyboard model. If unsure select pc-105 (a standard windows keyboard).
			</p>
			<div class="keyboard-settings-wrapper">
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
				<div class="btn-wrapper">
					<ui-button style="margin-right: 1rem;" @click="saveKeyboardSettings" :disabled="disabled">
						Save
					</ui-button>
					<ui-button color-preset="light-blue" @click="cancel">
						Cancel
					</ui-button>
				</div>
			</div>
			<div class="section-divider padded"></div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import AdminScreen from '../AdminScreen.vue';
import { IKeyboardLanguage, IKeyboardLayout, IKeyboardSettings } from 'eaasi-admin';
import { generateNotificationSuccess } from '../../../helpers/NotificationHelper';
import eventBus from '../../../utils/event-bus';
const kbLayouts = require('../../../assets/json/kbLayouts.json');

@Component({
	name: 'NodePreferenceManagement'
})
export default class NodePreferenceManagement extends AdminScreen {

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
	}

	async saveKeyboardSettings() {
		const language = this.keyboardLanguages.find(language => language.name === this.selectedKeyboardLanguage);
		const layout = this.keyboardLayouts.find(layout => layout.name === this.selectedKeyboardLayout);
		const payload: IKeyboardSettings = { language, layout };
		await this.$store.dispatch('admin/setKeyboardSettings', payload);
		const notification = generateNotificationSuccess('Keyboard Settings saved successfully.');
		eventBus.$emit('notification:show', notification);
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

<style lang='scss' scoped>
.rtl-header {
	background-color: lighten($light-neutral, 60%);
	padding-bottom: 2.5rem;

	h1 {
		font-size: 1.8rem;
	}
}
.keyboard-settings-wrapper {
	margin-top: 2rem;
	max-width: 66.66666667%;

	.btn-wrapper {
		float: right;
		margin-top: 2rem;
	}
}
.section-divider {
	margin-top: 6rem;
}
</style>