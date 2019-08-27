<template>
	<div>
		<modal>
			<template v-slot:header>
				An Error Has Occurred
			</template>
			<div v-if="isProductionMode" class="prodError">
				<span class="errorMsg">
					An Error Has Occurred.
				</span>
			</div>
			<div v-else class="debugError">
				<span class="errorMsg">
					An Error Has Occurred.
				</span>
				<div>
					{{ errorDetails }}
				</div>
			</div>
			<template v-slot:footer>
			</template>
		</modal>
	</div>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator';
import Modal from '@/components/global/Modal/Modal.vue';
import Vue from 'vue';

/**
 * A pop-up modal that notifies a user that an error has occurred
 */
@Component({
	name: 'ErrorModal',
	components: { Modal }
})
export default class ErrorModal extends Vue {
	isProductionMode: boolean = false;
	errorDetails: string;
}

</script>

<style lang="scss">
	.errorMessage {
		padding: 1.2rem;
	}
</style>
