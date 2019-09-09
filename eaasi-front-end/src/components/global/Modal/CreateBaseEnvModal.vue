<template>
	<modal
		v-if="isOpen"
		@close="$emit('close')"
		:size="size"
	>
		<div class="eaasi-info-modal-title" slot="header">
			<h2 v-if="title">Create Base Environment</h2>
		</div>
		<slot></slot>
		<div class="eaasi-info-modal-buttons" slot="footer">
			<div class="flex-row justify-end">
				<slot name="buttons">
					<div class="justify-end buttons-right">
						<ui-button @click="$emit('close')" secondary>Cancel</ui-button>
					</div>
				</slot>
			</div>
		</div>
	</modal>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { Modal, UiButton } from '@/components/global';

@Component({
	name: 'CreateBaseEnvModal',
	components: {
		Modal,
		UiButton
	}
})
export default class CreateBaseEnvModal extends Vue {
	isOpen = false;
}

</script>

<style lang="scss">
</style>
