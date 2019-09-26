<template>
	<div :class="['collapsable', { open }]">
		<div class="flex-row justify-between collapse-title" @click="open = !open">
			<span>{{ activeTitle }}</span>
			<div class="collapse-icon flex flex-center">
				<i :class="`fas fa-${activeIcon}`"></i>
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

	/**npm run
	 * The icon to display as the dropdown trigger
	 */
	@Prop({type: String, required: false, default: 'chevron-down'})
	readonly icon: string = 'chevron-down'

	/**
	 * Optional title to display when open is true
	 */
	@Prop({type: String, required: false})
	readonly openTitle: string

	/**
	 * The default title to display
	 */
	@Prop({type: String, required: true})
	readonly title: string

	/* Data
	============================================*/

	open: boolean = false;

	/* Computed
	============================================*/

	get activeIcon() {
		if(this.open) return 'times';
		return this.icon;
	}

	get activeTitle() {
		if(this.open && this.openTitle) return this.openTitle;
		return this.title;
	}

}

</script>

<style lang="scss">

.collapsable {
	background-color: lighten($light-blue, 90%);
	border: solid 2px $light-blue;
	border-radius: 1rem;
	padding: 2rem;

	.collapse-title {
		color: $dark-blue;
		cursor: pointer;
		font-weight: bold;
		user-select: none;

		i.fas {
			position: relative;
			top: 2px;
		}
	}

	.collapse-icon {
		background-color: #FFFFFF;
		border-radius: 50%;
		color: $light-blue;
		height: 3rem;
		width: 3rem;
	}

	.collapse-content {
		margin-top: 2rem;
	}

	&.open {
		background-color: #FFFFFF;

		.collapse-icon {
			background-color: transparent;
		}
	}
}
</style>