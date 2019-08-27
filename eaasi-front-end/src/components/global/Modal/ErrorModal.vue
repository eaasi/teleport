<template>
	<div v-if="isErrorModalOpen" class="errorModalContainer">
		<modal @close="closeModal">
			<template v-slot:header>
				<span id="errorHeader">
					An Error Has Occurred
				</span>
			</template>

			<div v-if="showDebugErrors" class="errorContainer">
				<div id="debugErrorMessage">
					{{ error.message }}
				</div>
				<div id="debugErrorInfo">
					{{ error.info }}
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
import { Sync } from 'vuex-pathify';

/**
 * A pop-up modal that notifies a user that an error has occurred
 */
@Component({
	name: 'ErrorModal',
	components: { Modal }
})
export default class ErrorModal extends Vue {

	/**
	 * Sets global isErrorModalOpen state to false
	 */
	closeModal() {
		this.isErrorModalOpen = false;
	}

	@Sync('global/isErrorModalOpen')
	isErrorModalOpen: boolean

	@Sync('global/showDebugErrors')
	showDebugErrors: boolean

	@Sync('global/appError')
	error: string

	beforeDestroy() {
		this.error = null;
	}
}

</script>

<style lang="scss">
	#errorHeader {
		font-weight: bold;
	}

	.errorContainer {
		line-height: 2.4rem;
		padding: 1.5rem;
	}

	#debugErrorMessage {
		padding: 10px 0;
	}

	#debugErrorInfo {
		padding: 10px 0;
	}

	#errorMessage {
		padding: 10px 0;
	}
</style>
