<template functional>
	<div class="header-menu-item flex-row" @click="listeners.click">
		<span>{{ props.label }}</span>
		<i v-if="props.icon" :class="`icon fas fa-fw fa-${props.icon}`"></i>
		<!-- May bring this back later if these become drop-menus
			<i class="down-arrow fas fa-chevron-down"></i>
		-->
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
	readonly label: string

	/**
	 * The icon to display in the trigger element
	 */
	@Prop({type: String, required: false})
	readonly icon: string

}

</script>

<style lang="scss">
.header-menu-item {
	color: #FFFFFF;
	cursor: pointer;
	height: $headerHeight;
	padding: 0 2rem;
	position: relative;

	.icon {
		color: lighten($light-blue, 60%);
		font-size: 2rem;
		margin-left: 5px;
	}

	.down-arrow {
		color: lighten($light-blue, 60%);
		font-size: 1.2rem;
		margin-left: 5px;
	}
}
</style>