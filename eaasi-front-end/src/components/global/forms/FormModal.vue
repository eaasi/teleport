<template>
	<modal @close="$emit('close')" :size="size">
		<div class="eaasi-form-modal-title" slot="header">
			<h2 v-if="title">{{ title }}</h2>
			<div class="eaasi-form-modal-subtitle">
				<span v-if="subtitle"> {{ subtitle }}</span>
			</div>
		</div>
		<div class="eaasi-form-modal-content">
			<eaasi-form ref="_form" @submit="$emit('save')">
				<slot></slot>
			</eaasi-form>
		</div>
		<div class="eaasi-form-modal-buttons" slot="footer">
			<div class="flex-row justify-between">
				<slot name="buttonsLeft">
					<ui-button v-if="hasRemoveButton" @click="$emit('remove')" color-preset="white">{{ removeText }}</ui-button>
				</slot>
				<slot name="buttonsRight">
					<div class="justify-end buttons-right">
						<ui-button @click="$emit('close')" color-preset="white">{{ cancelText }}</ui-button>
						<ui-button @click="$refs._form.submit()">{{ saveText }}</ui-button>
					</div>
				</slot>
			</div>
		</div>
	</modal>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import EaasiForm from '@/components/global/forms/EaasiForm.vue';
import UiButton from '@/components/global/UiButton.vue';
import Modal from '@/components/global/Modal/Modal.vue';

/**
 * A Modal with a title, subtitle, slot for content, close, and save button
 */
@Component({
	name: 'FormModal',
	components: {
		EaasiForm,
		UiButton,
		Modal
	}
})
export default class FormModal extends Vue {

	$refs!: {
		_form: EaasiForm
	};

	/* Props
    ============================================*/

    /**
     * The user-facing title at the top of the modal
     */
    @Prop({type: String, required: false})
	readonly title: string

    /**
     * Optional subtitle under the main title
     */
    @Prop({type: String, required: false})
    readonly subtitle: string

    /**
     * Save button text
     */
    @Prop({type: String, required: false, default: 'Save'})
    readonly saveText: string

    /**
     * Cancel button text
     */
    @Prop({type: String, required: false, default: 'Cancel'})
	readonly cancelText: string

	@Prop({type: Boolean, required: false, default: false})
	hasRemoveButton: boolean;

    /**
     * Remove button text
     */
    @Prop({type: String, required: false})
	readonly removeText: string

	/**
     * Alternative size of the modal. Accepts 'sm, small, lg, or large'
     */
    @Prop({type: String, default: 'medium'})
    readonly size: string

}

</script>

<style lang="scss">
	.eaasi-form-modal-title {
		padding: 2rem 0 1rem;

		h2 {
			font-size: 1.8rem;
			font-weight: 300;
			padding-bottom: 0.8rem;
			padding-left: 0.5rem;
		}
	}

	.eaasi-form-modal-subtitle {
		background-color: $light-grey;
		border-top: solid 3px $dark-grey;

		& > span {
			display: block;
			padding: 1.6rem 2rem;
		}
	}

	.eaasi-form-modal-buttons {
		background-color: $grey;
		padding: 3rem 4rem;

		.buttons-right button {
			margin-left: 1rem;
		}
	}

</style>