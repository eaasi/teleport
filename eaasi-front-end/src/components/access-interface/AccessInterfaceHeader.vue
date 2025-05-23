<template>
	<div id="accessHeader">
		<div class="ah-top flex align-center">
			<div class="ah-logo clickable" @click="goToDashboard">
				<!--suppress HtmlUnknownTarget -->
				<img id="eaasi-ah-logo" src="@/assets/eaasi_logos/eaasi-logo-transparent-background.png" alt="Eaasi Logo" />
			</div>

			<div class="ah-top-buttons flex-nowrap">
				<ui-button size="sm" icon="times" @click="$emit('click:exit')">
					Exit Emulation
				</ui-button>
				<ui-button size="sm" @click="$emit('click:restart')">
					Restart Emulation
				</ui-button>
				<ui-button
					size="sm"
					v-if="!createEnvironmentPayload"
					@click="showSaveEnvironment = true"
				>
					Save Environment
				</ui-button>
			</div>

			<div class="ah-alert flex-row" v-if="emulatorIsRunning">
				<span class="fas fa-exclamation-triangle"></span>
				<span class="ah-warning-message">
					Emulated computer must be shut down before saving.
				</span>
			</div>
		</div>
		<div class="ah-bottom flex-nowrap">
			<div class="ah-options-left flex flex-center flex-wrap">
				<ui-button
					size="sm"
					:disabled="printJobLabels.length < 1"
					@click="showPrintJobsModal = true"
				>
					Download Print Jobs
				</ui-button>
				<ui-button
					size="sm"
					:disabled="!enableChangeMedia"
					@click="showMediaOptions = true"
				>
					Change Resource Media
					<span v-if="mediaItems.length" class="fas fa-chevron-down" style="margin-left: 1rem;"></span>
				</ui-button>
			</div>
			<div class="ah-options-border"></div>
			<div class="ah-options-right flex flex-center flex-wrap">
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
import eventBus from '@/utils/event-bus';
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import {Get} from 'vuex-pathify';
import ChangeMediaModal from './ChangeMediaModal.vue';
import SaveEnvironmentModal from './SaveEnvironmentModal.vue';
import PrintJobsModal from './PrintJobsModal.vue';
import { IEnvironment } from '@/types/Resource';
import {ICreateEnvironmentPayload} from '@/types/Import';

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

	@Get('resource/activeEnvironment')
	readonly activeEnvironment: IEnvironment;

	@Get('resource/activeEphemeralEnvironment')
	createEnvironmentPayload: ICreateEnvironmentPayload;

	/* Data
	============================================*/
	mediaItems: [] = [];
	showMediaOptions: boolean = false;
	showSaveEnvironment: boolean = false;
	showPrintJobsModal: boolean = false;
	printJobLabels: string[] = [];
	enableChangeMedia: boolean = false;
	driveId: number;

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

	saveEnvironment(saveEnvOptions: ISaveEnvOptions) {
		eventBus.$emit('emulator:saveSnapshot', saveEnvOptions);
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
			driveId: this.driveId,
			archiveId: archiveId
		};
		eventBus.$emit('emulator:change-media', changeMediaRequest);
		this.showMediaOptions = false;
	}

	initEmulatorListeners() {
		eventBus.$on('emulator:print:add-print-job', filename => this.printJobLabels.push(filename));
		eventBus.$on('emulator:set-media', async removableMediaList => {
			if (!removableMediaList || removableMediaList.length === 0) {
				return;
			}
			const mediaItems: [] = [];
			for (let mediaItem of removableMediaList) {
				const result = await this.$store.dispatch('software/getSoftwareMetadata', {
					archiveId: mediaItem.archive,
					objectId: mediaItem.id,
				});
				const files = result.mediaItems.file.map(file => ({
					...file,
					objectId: mediaItem.id
				}));
				mediaItems.push(...(files as []));
			}
			this.mediaItems = mediaItems;
			this.driveId = removableMediaList[0].driveIndex;
			this.enableChangeMedia = true;
		});
	}

	initBrowserEvents() {
		// Empty!
	}

	removeBrowserEvents() {
		window.removeEventListener('beforeunload', () => {});
	}

	async mounted() {
		/*const { softwareId, objectId, archiveId} = this.$route.query;
		if ((softwareId || objectId) && archiveId) {
			const result = await this.$store.dispatch('software/getSoftwareMetadata', {
				archiveId,
				objectId: softwareId ? softwareId : objectId,
			});
			this.mediaItems = result.mediaItems.file;
		}*/
		this.initEmulatorListeners();
		this.initBrowserEvents();
	}

	beforeDestroy() {
		this.removeBrowserEvents();
		eventBus.$off('emulator:print:add-print-job');
	}
}
</script>

<style lang="scss">
	#accessHeader {
		background-color: lighten($grey, 40%);
		left: 0;
		position: fixed;
		right: 0;
		top: 0;
		z-index: 2;

		.eaasi-button {
			margin-right: 1.25rem;
		}

		.ah-warning-message {
			font-size: 1.5rem;
			margin-left: 1.2rem;
		}
	}

	.ah-top {
		height: $accessHeaderHeight - 4rem;
		padding-left: 15rem;
		position: relative;

		.ah-top-buttons {
			min-width: 600px;
		}
	}

	.ah-bottom {
		background-color: $grey;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: center;
		min-height: 42px;
		padding-left: 8rem;

		.ui-btn-container {
			margin: 0.5rem 0;
		}

		.ah-options-left,
		.ah-options-right {
			padding: 0 1rem;
		}

		.ah-options-border {
			border-right: 2px solid #d9dadb;
		}
	}

	.ah-logo {
		left: 1rem;
		position: absolute;
		top: 1.2rem;

		#eaasi-ah-logo {
			position: relative;
			top: 1px;
			width: 130px;

			&:hover {
				opacity: 0.7;
			}
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