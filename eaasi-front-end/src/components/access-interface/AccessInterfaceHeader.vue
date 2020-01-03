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
				<ui-button
					size="sm"
					@click="showSaveEnvironment = true"
				>
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
					size="sm"
					:disabled="printJobLabels.length < 1"
					@click="showPrintJobsModal = true"
				>
					Download Print Jobs
				</ui-button>
				<ui-button
					size="sm"
					:disabled="mediaItems.length === 0"
					@click="showMediaOptions = true"
				>
					Change Resource Media
					<span v-if="mediaItems.length" class="fas fa-chevron-down" style="margin-left: 1rem;"></span>
				</ui-button>
				<ui-button
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
					size="sm"
					@click="emitTakeScreenshot"
				>
					Save Screen Image
				</ui-button>
				<ui-button
					icon="keyboard"
					size="sm"
					@click="emitSendEscape"
				>
					Esc
				</ui-button>
				<ui-button
					icon="keyboard"
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

		<save-environment-modal
			v-if="showSaveEnvironment"
			@close="showSaveEnvironment = false"
			@save-environment="saveEnvironment"
		/>
		<print-jobs-modal
			v-if="showPrintJobsModal"
			:print-job-labels="printJobLabels"
			@download-print-job="downloadPrintJob"
			@close="showPrintJobsModal = false"
		/>
	</div>
</template>

<script lang="ts">
	import {ISaveEnvOptions} from '@/types/SaveEnvironment';
	import {SaveEnvironmentOption} from '@/types/SaveEnvironmentOption';
	import eventBus from '@/utils/event-bus';
	import Vue from 'vue';
	import {Component} from 'vue-property-decorator';
	import {Get} from 'vuex-pathify';
	import ChangeMediaModal from './ChangeMediaModal.vue';
	import SaveEnvironmentModal from './SaveEnvironmentModal.vue';
	import PrintJobsModal from './PrintJobsModal.vue';

	@Component({
		name: 'AccessInterfaceHeader',
		components: {
			ChangeMediaModal,
			PrintJobsModal,
			SaveEnvironmentModal
		}
	})
	export default class AccessInterfaceHeader extends Vue {

		/* Computed
        ============================================*/
		@Get('emulatorIsRunning')
		readonly emulatorIsRunning: boolean;

		@Get('driveId')
		readonly driveId: number;

		/* Data
		============================================*/
		mediaItems: [] = [];
		showMediaOptions: boolean = false;
		showSaveEnvironment: boolean = false;
		showPrintJobsModal: boolean = false;
		printJobLabels: string[] = [];

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

		downloadPrintJob(label: string) {
			eventBus.$emit('emulator:print:download-print-job', label);
		}

		async saveEnvironment(saveEnvOptions: ISaveEnvOptions) {
			let { title, description, saveType } = saveEnvOptions ;

			// We are saving a new base environment resource
			if (saveType === SaveEnvironmentOption.newEnvironment) {
				console.log(':: accessInterfaceHeader :: calling save new environment');
				let res = await this.$store.dispatch('resource/saveNewEnvironment', { title, description });
				if (res.status === '0') {
					this.$router.push({ name: 'Explore Resources' });
				} else {
					console.error('Error Saving Environment: ', res);
				}

            // We are making a revision to an existing environment resource
			} else if (saveType === SaveEnvironmentOption.createRevision) {
				let res = await this.$store.dispatch('resource/saveEnvironmentRevision', description);
				if (res.status === '0') {
					this.$router.push({ name: 'Explore Resources' });
				} else {
					console.error('Error Saving Environment: ', res);
				}

            // We are creating a new environment resource that is an 'Object Environment'
			} else if (saveType === SaveEnvironmentOption.objectEnvironment) {
				let res = await this.$store.dispatch('resource/saveObjectEnvironment', { title, description });
				if (res.status === '0') {
					this.$router.push({ name: 'Explore Resources' });
				} else {
					console.error('Error Saving Environment: ', res);
				}
			}
		}

		goToDashboard() {
			this.$router.push({ 'name': 'Dashboard' });
		}

		changeMedia(mediaId) {
			let EaasClient = (window as any).EaasClient || null;
			const { softwareId, objectId, archiveId } = this.$route.query;
			const label = mediaId === 'empty' ? '' : mediaId;
			const changeMediaRequest = {
				objectId: softwareId ? softwareId : objectId,
				label,
				driveId: this.driveId
			};
			eventBus.$emit('emulator:change-media', changeMediaRequest);
			this.showMediaOptions = false;
		}

		initEmulatorListeners() {
			eventBus.$on('emulator:print:add-print-job', filename => this.printJobLabels.push(filename));
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
			this.initEmulatorListeners();
		}

		beforeDestroy() {
			eventBus.$off('emulator:print:add-print-job');
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
			margin-left: 1.2rem;
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
		padding-left: 20rem;

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