<template functional>
	<div class="options-box">
		<div class="ob-header" v-if="props.header">
			<span>{{ props.header }}</span>
		</div>
		<div class="ob-content">
			<slot></slot>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
	name: 'OptionsBox',
	props: {
		header: String
	}
})
export default class OptionsBox extends Vue {}

</script>

<style lang="scss">
.options-box {
	background-color: lighten($light-neutral, 60%);
	border-radius: 1rem;
	display: inline-block;
	min-width: 320px;
	overflow: hidden;
	.ob-content {
		padding: 1.5rem;
	}
	.ob-header {
		background-color: $light-blue;
		color: #FFF;
		font-size: 1.2rem;
		padding: 2px 10px;
		text-align: center;
		text-transform: uppercase;
	}
}
</style>