<template>
	<div :class="['collapsable', { open }]">
		<div class="flex-row justify-between collapse-title" @click="open = !open">
			<span class="collapsable-active-title">{{ activeTitle }}</span>
			<div class="collapse-icon flex flex-center">
				<span :class="`fas fa-${activeIcon}`"></span>
			</div>
		</div>
		<div class="collapse-content" v-if="open">
			<slot></slot>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

/**
 * A Collapsable content wrapper
 * @example ../docs/Collapsable.Example.md
 */
@Component({
	name: 'Collapsable',
})
export default class Collapsable extends Vue {

	/* Props
	============================================*/

	/**
	 * The default title to display
	 */
	@Prop({type: String, required: true})
	readonly title: string;

	/**
	 * The icon to display as the dropdown trigger
	 */
	@Prop({type: String, required: false, default: 'chevron-down'})
	readonly icon: string = 'chevron-down';

	/**
	 * Optional title to display when open is true
	 */
	@Prop({type: String, required: false})
	readonly openTitle: string;

	/**
	 * Content will mount collapsed when true
	 */
	@Prop({type: Boolean, required: false, default: false})
	readonly collapsed: boolean;

	/**
	 * Use secondary styles
	 */
	@Prop({type: Boolean, required: false})
	readonly secondary: boolean;

	/* Data
	============================================*/

	open: boolean = true;

	/* Computed
	============================================*/

	get activeIcon() {
		if(this.open) return 'chevron-up';
		return this.icon;
	}

	get activeTitle() {
		if(this.open && this.openTitle) return this.openTitle;
		return this.title;
	}

	/* Lifecycle hooks
	============================================*/

	beforeMount() {
		if(this.collapsed) this.open = false;
	}
}

</script>

<style lang="scss">

.collapsable {
	background-color: $light-grey;
	padding: 2rem;

	.collapse-icon {
		background-color: $light-grey;
		border-radius: 50%;
		color: $dark-green;
		height: 3rem;
		width: 3rem;
	}

	.collapse-title {
		color: $dark-green;
		cursor: pointer;
		font-weight: bold;
		user-select: none;

		span.fas {
			position: relative;
			top: 2px;
		}
	}

	.collapse-content {
		margin-top: 2rem;
	}

	&.secondary {
		background-color: $light-grey;
		border: solid 2px $dark-green;
		border-radius: 1rem;

		.collapse-icon {
			background-color: #FFFFFF;
		}

		&.open {
			background-color: #FFFFFF;
		}

		&.open .collapse-icon {
			background-color: transparent;
		}
	}
}
</style>