<template>
	<modal @close="$emit('close')" :size="size">
		<div class="eaasi-info-modal-title" slot="header">
			<h2 v-if="title">{{ title }}</h2>
		</div>
		<slot></slot>
		<div class="eaasi-info-modal-buttons" slot="footer">
			<div class="flex-row justify-end">
				<slot name="buttons">
					<div class="justify-end buttons-right">
						<ui-button
							@click="$emit('close')"
							color-preset="light-blue"
							class="btn-info-modal-close"
						>
							{{ buttonText }}
						</ui-button>
					</div>
				</slot>
			</div>
		</div>
	</modal>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import Modal from '@/components/global/Modal/Modal.vue';
import UiButton from '@/components/global/UiButton.vue';

@Component({
	name: 'InfoModal',
	components: {
		Modal,
		UiButton
	}
})
export default class InfoModal extends Vue {

	/* Props
	============================================*/

	/**
     * Cancel button text
     */
    @Prop({type: String, required: false, default: 'Okay'})
	readonly buttonText: string

    /**
     * The user-facing title at the top of the modal
     */
    @Prop({type: String, required: true})
    readonly title: string

	 /**
     * Alternative size of the modal. Accepts 'sm, small, lg, or large'
     */
    @Prop({type: String, default: 'medium'})
    readonly size: string

}

</script>

<style lang="scss">
	.eaasi-info-modal-title {
		border-bottom: solid 4px darken($light-neutral, 10%);
		padding: 2rem 0 1rem;

		h2 {
			padding-left: 2rem;
		}
	}

	.eaasi-info-modal-buttons {
		background-color: lighten($light-neutral, 80%);
		border-top: solid 2px darken($light-neutral, 10%);
		padding: 3rem 4rem;

		.buttons-right button {
			margin-left: 1rem;
		}
	}
</style>