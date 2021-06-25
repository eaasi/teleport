<template>
	<modal
		class="error-modal-container"
		@close="closeModal"
		:size="size"
	>
		<div class="eaasi-info-modal-title" slot="header">
			<h2>An Error Has Occurred</h2>
		</div>
		<div class="error-container">
			<div id="debugErrorMessage" class="error-section" v-if="error.message">
				<p>Error Message:</p>
				{{ error.message }}
			</div>

			<div id="debugErrorInfo" class="error-section" v-if="error.info">
				<p>Error Info:</p>
				{{ error.info }}
			</div>

			<div id="debugErrorRequest" class="error-section" v-if="error.request">
				<p>Response Info</p>
				<strong>URL: </strong>{{ error.request.url }}
			</div>

			<!--<div class="error-section">
				<p>Stack Trace: </p>
				<div id="debugErrorStack" v-if="error.stack">
					<div class="scrollable-container lg">
						<div>
							{{ error.stack }}
						</div>
						<div v-show="apiEvents.length > 0">
							<hr />
							<h6 style="margin-top: 0.65rem;">Web Api Events</h6>
							<div>
								<div v-for="(event, index) in apiEvents" :key="index">
									{{ event }}
								</div>
							</div>
						</div>
						<hr />
						<div>
							<p>EaaSi Version: {{ appVersion }}</p>
						</div>
					</div>
				</div>
				<ui-button
					@click="copyToClipboard"
					color-preset="light-blue"
					class="btn-info-modal-close"
					stlye="float:left;"
				>
					Copy Error Details to Clipboard
				</ui-button>
			</div>-->
		</div>
		<!-- For 2020.03 release we are showing complete front-end stack trace -->
		<!-- <div v-else class="error-container">
			<div id="defaultErrorMessage" class="text-center">
				<h2>Oops, something went wrong!</h2>
				<p>An unexpected error has occurred. Our developers have been automatically notified. Please try again later.</p>
			</div>
		</div> -->

		<div class="eaasi-info-modal-buttons" slot="footer">
			<div class="flex-row justify-end">
				<slot name="buttons">
					<div class="justify-end buttons-right">
						<ui-button
							color-preset="light-blue"
							class="btn-info-modal-close"
							@click="downloadFrontendLogs"
						>
							Download Front-End Logs
						</ui-button>
						<a :href="backendLogsUrl">
							<ui-button
								color-preset="light-blue"
								class="btn-info-modal-close"
							>
								Download Back-End Logs
							</ui-button>
						</a>
						<ui-button
							@click="closeModal"
							color-preset="light-blue"
							class="btn-info-modal-close"
						>
							Close
						</ui-button>
					</div>
				</slot>
			</div>
		</div>
	</modal>
</template>

<script lang="ts">
import Vue from 'vue';
import InfoModal from '@/components/global/Modal/InfoModal.vue';
import { Component } from 'vue-property-decorator';
import { IApplicationLog } from '@/types/ApplicationLog';
import { Get, Sync } from 'vuex-pathify';
import config from '../../../config';
import zlib from 'zlib';

/**
 * A pop-up modal that notifies a user that an error has occurred
 */
@Component({
	name: 'ErrorModal',
	components: { InfoModal }
})
export default class ErrorModal extends Vue {

	/* Computed
	============================================*/

	get size() {
		return this.showDebugErrors ? 'md' : 'sm';
	}

	@Sync('appError')
	error: string;

	@Get('showDebugErrors')
	showDebugErrors: boolean;

	/* Data
	============================================*/
	apiEvents: IApplicationLog[] = [];
	appVersion: string = '';
	backendLogsUrl: string = config.EMIL_SERVICE_ENDPOINT + '/error-report';

	/* Methods
	============================================*/

	closeModal() {
		this.error = null;
	}

	async getApiEvents() {
		this.apiEvents = await this.$store.dispatch('admin/getMostRecentErrorLogs');
		this.appVersion = config.APP_VERSION;
	}

	downloadFrontendLogs() {
		let apiEventsString = this.apiEvents.map(event => this.objToString(event));
		let logs = `
##### Front-End Stack Trace #####
${this.objToString(this.error)}
###### Web-Api Event List #######
${apiEventsString}
###### App Version #######
EaaSi Version: ${this.appVersion}
########## < END > ##############`;

		var output = zlib.gzipSync(logs);
		var blob = new Blob([output.buffer], { type: 'application/gzip' });
		const link = document.createElement('a');
		link.href = URL.createObjectURL(blob);
		link.setAttribute('download', 'eaasi-frontend-error-report.gz');
		document.body.appendChild(link);
		link.click();
		link.parentNode.removeChild(link);
	}

	objToString (obj) {
		var str = '';
		for (var p in obj) {
			if (obj.hasOwnProperty(p)) {
				str += p + '::' + obj[p] + '\n';
			}
		}
		return str;
	}

	executeCopy(text: string) {
		var input = document.createElement('textarea');
		document.body.appendChild(input);
		input.value = text;
		input.focus();
		input.select();
		document.execCommand('Copy');
		input.remove();
	}

	/* Lifecycle hooks
	============================================*/
	async beforeMount() {
		await this.getApiEvents();
	}

	beforeDestroy() {
		this.error = null;
	}
}

</script>

<style lang="scss">
	#errorHeader {
		font-weight: bold;
	}

	.error-section {
		margin-bottom: 2.4rem;

		p {
			font-size: 1.2rem;
		}
	}

	.error-container {
		line-height: 2.4rem;
		padding: 1.5rem;
	}

	#debugErrorStack {
		background: lighten($dark-neutral, 90%);
		border: 1px solid lighten($dark-neutral, 80%);
		border-left: 3px solid $red;
		color: $dark-neutral;
		display: block;
		font-family: monospace;
		font-size: 15px;
		line-height: 1.6;
		margin-bottom: 1.6rem;
		padding: 1rem 1.5rem;
		white-space: pre-line;
	}

	.scrollable-container {
		overflow-y: auto;
		&.lg {
			max-height: 40rem;
		}
	}

	#defaultErrorMessage {
		margin: 0 auto;
		max-width: 50rem;
		padding: 4rem 0;
	}
</style>
