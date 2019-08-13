<template>
	<transition name="modal-fade">
		<div class="eaasi-modal-container flex-column flex-center" role="dialog" v-if="show">
			<div :class="['eaasi-modal', 'size-' + size]">
				<div class="eaasi-modal-header">
					<div class="eaasi-modal-close" @click="$emit('close')">
						<i class="fal fa-times"></i>
					</div>
					<slot name="header"></slot>
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
 * @example ../docs/Modal.Example.md
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
     * Whether to show or hide the modal
     */
    @Prop({type: Boolean, required: true})
    readonly show: boolean


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
	$base-size: 70rem;

	.eaasi-modal-container {
		@include stretch;
		background-color: rgba(0, 0, 0, 0.6);
		opacity: 1;
		overflow-y: scroll;
		position: fixed;
	}

	.eaasi-modal {
		background-color: #FFF;
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
		font-size: 3rem;
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
