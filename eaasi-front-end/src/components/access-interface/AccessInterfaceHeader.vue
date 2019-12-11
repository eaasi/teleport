<template>
	<div id="accessHeader">
		<div class="ah-top flex align-center">
			<div class="ah-logo clickable" @click="goToDashboard">
				<!--suppress HtmlUnknownTarget -->
				<img id="eaasi-ah-logo" src="@/assets/header-logo.png" alt="Eaasi Logo" />
			</div>

			<div>
				<ui-button size="sm" icon="times" @click="$emit('click:exit')">
					Exit Emulation
				</ui-button>
				<ui-button size="sm" @click="$emit('click:restart')">
					Restart Emulation
				</ui-button>
				<ui-button size="sm" disabled @click="saveEnvironment">
					Save Environment
				</ui-button>
			</div>

			<div class="ah-alert flex-row" v-if="emulatorIsRunning">
				<span class="far fa-exclamation-triangle"></span>
				<span class="ah-warning-message">
					Emulated computer must be shut down before saving.
				</span>
			</div>
		</div>
		<div class="ah-bottom">
			<div class="ah-options-left">
				<ui-button
					white
					size="sm"
					:disabled="mediaItems.length === 0"
					@click="showMediaOptions = true"
				>
					Change Resource Media 
					<span v-if="mediaItems.length" class="fas fa-chevron-down" style="margin-left: 1rem;"></span>
				</ui-button>
				<ui-button
					white
					size="sm"
					disabled
				>
					Downloadable Assets
				</ui-button>
			</div>
			<div class="ah-options-border"></div>
			<div class="ah-options-right">
				<ui-button
					icon="camera"
					white
					size="sm"
					@click="emitTakeScreenshot"
				>
					Save Screen Image
				</ui-button>
				<ui-button
					icon="keyboard"
					white
					size="sm"
					@click="emitSendEscape"
				>
					Esc
				</ui-button>
				<ui-button
					icon="keyboard"
					white
					size="sm"
					@click="emitSendCtrlAltDelete"
				>
					Ctrl/Alt/Del
				</ui-button>
			</div>
		</div>
		<change-media-modal
			v-if="showMediaOptions"
			:media-items="mediaItems"
			@close="showMediaOptions = false"
			@change-media="changeMedia"
		/>
	</div>
</template>

<script lang="ts">
	import eventBus from '@/utils/event-bus';
	import Vue from 'vue';
	import ChangeMediaModal from './ChangeMediaModal.vue';
	import { Component } from 'vue-property-decorator';
	import { Get } from 'vuex-pathify';

	@Component({
		name: 'AccessInterfaceHeader',
		components: {
			ChangeMediaModal
		}
	})
	export default class AccessInterfaceHeader extends Vue {

		/* Computed
        ============================================*/
		@Get('emulatorIsRunning')
		readonly emulatorIsRunning: boolean;

		/* Data
		============================================*/
		mediaItems: [] = [];
		showMediaOptions: boolean = false;

		/* Methods
        ============================================*/
		emitTakeScreenshot() {
			eventBus.$emit('emulator:takeScreenshot');
		}

		emitSendEscape() {
			eventBus.$emit('emulator:send:escape');
		}

		emitSendCtrlAltDelete() {
			eventBus.$emit('emulator:send:ctrlAltDelete');
		}

		saveEnvironment() {
			console.log('TODO: Implement AccessInterfaceHeader.saveEnvironment');
		}

		goToDashboard() {
			this.$router.push({ 'name': 'Dashboard' });
		}

		changeMedia(mediaId) {
			const { softwareId, objectId, archiveId } = this.$route.query;
			const label = mediaId === 'empty' ? '' : mediaId;
			const changeMediaRequest = {
				objectId: softwareId ? softwareId : objectId,
				label,
				driveId: 1
			};
			eventBus.$emit('emulator:change-media', changeMediaRequest);
			this.showMediaOptions = false;
		}
		
		async mounted() {
			const { softwareId, objectId, archiveId } = this.$route.query;
			if ((softwareId || objectId) && archiveId) {
				const result = await this.$store.dispatch('software/getSoftwareMetadata', {
					archiveId,
					objectId: softwareId ? softwareId : objectId,
				});
				this.mediaItems = result.mediaItems.file;
			}
		}
	}

</script>

<style lang="scss">
	#accessHeader {
		background-color: lighten($teal, 60%);
		left: 0;
		position: fixed;
		right: 0;
		top: 0;
		z-index: 2;

		.eaasi-button {
			margin-right: 2rem;
		}

		.ah-warning-message {
			font-size: 1.5rem;
		}
	}

	.ah-top {
		border-bottom: 3px solid lighten($teal, 10%);
		height: $accessHeaderHeight - 4rem;
		padding-left: 14rem;
		position: relative;
	}

	.ah-bottom {
		background-color: darken($teal, 20%);
		display: flex;
		height: 42px;
		padding-left: $accessMenuWidth;

		.ah-options-left {
			margin-bottom: auto;
			margin-top: auto;
			padding: 0 1rem;
		}

		.ah-options-border {
			border-right: 3px solid darken($teal, 50%);
		}

		.ah-options-right {
			margin-bottom: auto;
			margin-top: auto;
			padding: 0 3rem;
		}
	}

	.ah-logo {
		background-color: darken($teal, 28%);
		border: 4px solid darken($teal, 42%);
		border-radius: 50%;
		left: 1rem;
		position: absolute;
		top: 1.2rem;

		#eaasi-ah-logo {
			position: relative;
			top: 1px;
		}
	}

	.ah-alert {
		i {
			color: darken($orange, 12%);
			font-size: 2.5rem;
			margin-right: 1rem;
		}
	}
</style>