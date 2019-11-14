<template>
	<modal @close="$emit('close')" :size="size">
		<div class="eaasi-confirm-modal-title" slot="header">
			<h2 v-if="title">{{ title }}</h2>
		</div>
		<div class="txt-center eaasi-confirm-modal-content">
			<slot></slot>
		</div>
		<div class="eaasi-confirm-modal-buttons" slot="footer">
			<div class="flex-row justify-end">
				<slot name="buttons">
					<div class="justify-end buttons-right">
						<ui-button @click="cancel" secondary>
							{{ cancelLabel }}
						</ui-button>
						<ui-button @click="$emit('click:confirm')">
							{{ confirmLabel }}
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
	name: 'ConfirmModal',
	components: {
		Modal,
		UiButton
	}
})
export default class ConfirmModal extends Vue {

	/* Props
	============================================*/

	/**
     * Confirm button text
     */
    @Prop({type: String, required: false, default: 'Cancel'})
	readonly cancelLabel: string

    /**
     * Confirm button text
     */
    @Prop({type: String, required: false, default: 'Confirm'})
	readonly confirmLabel: string

    /**
     * The user-facing title at the top of the modal
     */
    @Prop({type: String, required: true})
    readonly title: string

	 /**
     * Alternative size of the modal. Accepts 'sm, small, lg, or large'
     */
    @Prop({type: String, default: 'small'})
	readonly size: string

    /* Methods
	============================================*/

    cancel() {
    	this.$emit('close');
    	this.$emit('click:cancel');
    }

}

</script>

<style lang="scss">
	.eaasi-confirm-modal-title {
		border-bottom: solid 4px darken($light-neutral, 10%);
		padding: 2rem 0 1rem;

		h2 {
			padding-left: 2rem;
		}
	}

	.eaasi-confirm-modal-content {
		line-height: 1.5em;
		padding: 3rem 2rem;
	}

	.eaasi-confirm-modal-buttons {
		background-color: lighten($light-neutral, 80%);
		border-top: solid 2px darken($light-neutral, 10%);
		padding: 3rem 4rem;

		.buttons-right button {
			margin-left: 2rem;
		}
	}
</style>