<template>
	<div :class="['slide-menu', {open}]">
		<slot></slot>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component({
	name: 'SlideMenu',
})
export default class SlideMenu extends Vue {

	/* Props
	============================================*/

	@Prop({type: Boolean, required: true})
	readonly open: boolean

}

</script>

<style lang="scss">
.slide-menu {
	background-color: #FFF;
	bottom: 0;
	box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
	position: fixed;
	right: 0;
	top: $headerHeight;
	transition: transform 0.5s ease-out;
	width: $slideMenuWidth;

	&.open {
		transform: translate3d($slideMenuWidth, 0, 0);
	}
}
</style>