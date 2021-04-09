<template>
	<transition name="modal-fade">
		<div class="eaasi-modal-container flex-column flex-center" role="dialog">
			<div :class="['eaasi-modal', 'size-' + size]">
				<div class="eaasi-modal-header">
					<div
						v-if="showX"
						class="eaasi-modal-close"
						@click="$emit('close')"
					>
						<span class="fal fa-times"></span>
					</div>
					<slot name="header">
						<h2 v-if="title">{{ title }}</h2>
					</slot>
				</div>
				<div class="eaasi-modal-content">
					<slot></slot>
				</div>
				<div class="eaasi-modal-footer">
					<slot name="footer"></slot>
				</div>
			</div>
		</div>
	</transition>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

/**
 * A simple pop-up modal with three content slots: content (default), header, and footer
 */
@Component({
	name: 'Modal'
})
export default class Modal extends Vue {

	/* Props
    ============================================*/

    /**
     * Alternative size of the modal. Accepts 'sm, small, lg, or large'
     */
    @Prop({type: String, default: 'medium'})
	readonly size: string

	/**
     * Modal header headline
     */
    @Prop({type: String, required: false})
    readonly title: string

	/**
	 * Show "X" in the top right-hand corner of the modal to cloase
	 */
	@Prop({type: Boolean, required: false, default: false})
	readonly showX: string


	/* Lifecycle Hooks
	============================================*/

    mounted() {
		document.body.classList.add('modal-open');
    }

    beforeDestroy() {
    	document.body.classList.remove('modal-open');
    }

}

</script>

<style lang="scss">
	$base-size: 80rem;

	.eaasi-modal-container {
		@include stretch;
		background-color: rgba(0, 0, 0, 0.6);
		opacity: 1;
		overflow-y: scroll;
		position: fixed;
		z-index: 100;
	}

	.eaasi-modal {
		background-color: #FFFFFF;
		box-shadow: 2px 2px 10px 0px rgba(0, 0, 0, 0.4);
		max-width: $base-size;
		width: 100%;

		&.size-sm,
		&.size-small {
			max-width: $base-size - 20rem;
		}

		&.size-lg,
		&.size-large {
			max-width: $base-size + 20rem;
		}
	}

	.eaasi-modal-content {
		max-height: 70vh;
		overflow-y: auto;
		padding: 1.5rem;
	}

	.eaasi-modal-header {
		@include clearfix;
		padding: 1rem 1.5rem;
		position: relative;
	}

	.eaasi-modal-close {
		cursor: pointer;
		float: right;
		font-size: 2.6rem;
		position: relative;
	}

	.modal-fade-enter-active,
	.modal-fade-leave-active {
		transition: opacity 0.3s;

		.eaasi-modal {
			transition: transform 0.3s;
		}
	}

	.modal-fade-enter {
		opacity: 0;

		.eaasi-modal {
			transform: translate3d(0, 20rem, 0);
		}
	}

	.modal-fade-leave-active {
		opacity: 0;

		.eaasi-modal {
			transform: translate3d(0, 20rem, 0);
		}
	}

	.eaasi-modal .modal-header h2,
	.eaasi-modal .modal-header h3,
	.eaasi-modal .modal-header h4 {
		margin-bottom: 0;
	}
</style>
