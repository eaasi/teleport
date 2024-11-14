<template functional>
	<div class="header-menu-item flex-row" @click="listeners.click">
		<span class="header-menu-item-text">{{ props.label }}</span>
		<span v-if="props.icon" :class="`icon fas fa-fw fa-${props.icon}`"></span>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component({
	name: 'HeaderMenuItem'
})
export default class HeaderMenuItem extends Vue {

	/* Props
	============================================*/

	/**
	 * The text to display in the trigger element
	 */
	@Prop({type: String, required: true})
	readonly label: string;

	/**
	 * The icon to display in the trigger element
	 */
	@Prop({type: String, required: false})
	readonly icon: string;

}

</script>

<style lang="scss">
.header-menu-item {
	color: $dark-light-grey;
	cursor: pointer;
	height: $headerHeight;
	padding: 0 2rem;
	position: relative;

	.header-menu-item-text {
		width: max-content;
	}

	.icon {
		color: $dark-light-grey;
		font-size: 2rem;
		margin-left: 5px;
	}
}
@media screen and (max-width: 950px) {
	.header-menu-item {
		height: inherit;
		margin: 8px;
	}
}
</style>