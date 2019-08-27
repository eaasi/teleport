<template>
	<div v-if="isErrorModalOpen">
		<modal v-on:close="closeModal">

			<template v-slot:header>
				<span id="error-header">
                    An Error Has Occurred
				</span>
			</template>

			<div v-if="showDebugErrors" class="errorContainer">
				<div id="debug-error-message">
					<h3>Message:</h3>
					{{ error.message }}
				</div>
				<div id="error-info">
					<h3>Info:</h3>
					{{ error.info }}
				</div>
			</div>
			<div v-else class="errorContainer">
				<div id="error-message">
					There was an error loading the application. We're sorry for the inconvenience.
				</div>
			</div>
		</modal>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import Modal from '@/components/global/Modal/Modal.vue';
import { Component, Prop } from 'vue-property-decorator';
import { Sync } from 'vuex-pathify';
import store from '../../../store';

/**
 * A pop-up modal that notifies a user that an error has occurred
 */
@Component({
	name: 'ErrorModal',
	components: { Modal }
})
export default class ErrorModal extends Vue {
	isProductionMode: boolean = false;

	closeModal() {
		store.set('global/isErrorModalOpen', false);
	}

	@Sync('global/isErrorModalOpen')
	isErrorModalOpen: boolean

	@Sync('global/showDebugErrors')
	showDebugErrors: boolean

	@Sync('global/appError')
	error: string

	beforeDestroy() {
		store.set('global/appError', undefined);
	}
}

</script>

<style lang="scss">
	#error-header {
		font-weight: bold;
	}

	.errorContainer {
		line-height: 2.4rem;
		padding: 1.5rem;
	}

	#debug-error-message {
		padding: 10px 0;
	}

	#error-info {
		padding: 10px 0;
	}

	#error-message {
		padding: 10px 0;
	}
</style>
