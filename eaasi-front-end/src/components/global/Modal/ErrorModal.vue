<template>
	<info-modal
		class="error-modal-container"
		@close="closeModal"
		v-if="error !== null"
		:size="size"
		title="An Error Has Occurred"
	>
		<div v-if="showDebugErrors" class="error-container">
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
				<b>URL: </b>{{ error.request.url }}
			</div>

			<div class="error-section">
				<p>Stack Trace: </p>
				<div id="debugErrorStack" v-if="error.stack">
					<div>
						{{ error.stack }}
					</div>
				</div>
			</div>
		</div>
		<div v-else class="error-container">
			<div id="defaultErrorMessage" class="text-center">
				<h2>Oops, something went wrong!</h2>
				<p>An unexpected error has occurred. Our developers have been automatically notified. Please try again later.</p>
			</div>
		</div>
	</info-modal>
</template>

<script lang="ts">
import Vue from 'vue';
import InfoModal from '@/components/global/Modal/InfoModal.vue';
import { Component } from 'vue-property-decorator';
import {Get, Sync} from 'vuex-pathify';

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

	@Sync('global/appError')
	error: string

	@Get('global/showDebugErrors')
	showDebugErrors: boolean

	/* Methods
	============================================*/

	closeModal() {
		this.error = null;
	}

	/* Lifecycle hooks
	============================================*/

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

	#defaultErrorMessage {
		margin: 0 auto;
		max-width: 50rem;
		padding: 4rem 0;
	}
</style>
