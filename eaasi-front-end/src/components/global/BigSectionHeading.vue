<template functional>
	<div class="heading-container">
		<span class="big-heading-text">
			{{ props.title }}
		</span>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

/**
 * A Big Section Heading
 */
@Component({
	name: 'BigSectionHeading'
})
export default class BigSectionHeading extends Vue {

/* Props
============================================*/
// Title of the Section
@Prop({type: String, required: true})
readonly title: string
}
</script>

<style lang="scss">
	.heading-container {
		display: flex;
	}

	.big-heading-text {
		display: inline-block;
		font-size: 2.4rem;
		padding-bottom: 1.1rem;
	}
</style>
