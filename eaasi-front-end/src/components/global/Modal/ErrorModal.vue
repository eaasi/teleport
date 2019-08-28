<template>
	<div v-if="error !== null" class="errorModalContainer">
		<modal @close="closeModal">
			<template v-slot:header>
				<h3>An Error Has Occurred</h3>
			</template>

			<div v-if="showDebugErrors" class="errorContainer">
				<div id="debugErrorMessage">
					<p class="errorSection">Error Message:</p>
					{{ error.message }}
				</div>

				<div id="debugErrorInfo">
					<p class="errorSection">Error Info:</p>
					{{ error.info }}
				</div>

				<p class="errorSection">Stack Trace:</p>
				<div id="debugErrorStack" v-if="error.stack">
					<div>
						{{ error.stack }}
					</div>
				</div>
			</div>
			<div v-else class="errorContainer">
				<div id="errorMessage">
					There was an error loading the application. We're sorry for the inconvenience.
				</div>
			</div>
		</modal>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import Modal from '@/components/global/Modal/Modal.vue';
import { Component } from 'vue-property-decorator';
import {Get, Sync} from 'vuex-pathify';

/**
 * A pop-up modal that notifies a user that an error has occurred
 */
@Component({
	name: 'ErrorModal',
	components: { Modal }
})
export default class ErrorModal extends Vue {

	closeModal() {
		this.error = null;
	}

	@Sync('global/appError')
	error: string

	@Get('global/showDebugErrors')
	showDebugErrors: boolean

	beforeDestroy() {
		this.error = null;
	}
}

</script>

<style lang="scss">
	#errorHeader {
		font-weight: bold;
	}

	.errorSection {
		font-size: 1.2rem;
	}

	.errorContainer {
		line-height: 2.4rem;
		padding: 1.5rem;
	}

	#debugErrorMessage {
		padding-bottom: 2.4rem;
	}

	#debugErrorInfo {
		padding-bottom: 2.4rem;
	}

	#debugErrorStack {
		background: lighten($dark-neutral, 90%);
		border-left: 3px solid $red;
		color: $dark-neutral;
		display: block;
		font-family: monospace;
		font-size: 15px;
		height: 16rem;
		line-height: 1.6;
		margin-bottom: 1.6rem;
		overflow: scroll;
		padding: 1rem 1.5rem;
		white-space: pre-line;
	}

	#errorMessage {
		padding: 1rem 0;
	}

</style>
