<template>
	<modal @close="$emit('close')">
		<div class="eaasi-form-modal-title" slot="header">
			<h2 v-if="title">{{ title }}</h2>
		</div>
		<div class="eaasi-form-modal-content">
			<eaasi-form ref="_form" @submit="$emit('save')">
				<slot></slot>
			</eaasi-form>
		</div>
		<div class="eaasi-form-modal-buttons" slot="footer">
			<div class="flex-row justify-end">
				<slot name="buttonsLeft"></slot>
				<slot name="buttonsRight">
					<div class="justify-end buttons-right">
						<ui-button @click="$emit('close')" secondary>{{ cancelText }}</ui-button>
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
import EaasiForm from './EaasiForm.vue';
import { Modal, UiButton } from '@/components/global';

	@Component({
		name: 'FormModal',
		components: {
			EaasiForm,
			Modal,
			UiButton
		}
	})
export default class FormModal extends Vue {

	/* Props
    ============================================*/

    /**
     * The user-facing title at the top of the modal
     */
    @Prop({type: String, required: false})
    readonly title: string

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

}

</script>

<style lang="scss">
	.eaasi-form-modal-title {
		border-bottom: solid 4px darken($light-neutral, 10%);
		padding: 2rem 0 1rem;

		h2 {
			padding-left: 2rem;
		}
	}

	.eaasi-form-modal-buttons {
		background-color: lighten($light-neutral, 80%);
		border-top: solid 2px darken($light-neutral, 10%);
		padding: 3rem 4rem;

		.buttons-right button {
			margin-left: 1rem;
		}
	}

</style>