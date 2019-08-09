<template functional>
	<div class="heading-container">
		<span class="heading-icon">
			<i :class="['fa', `fas ${props.icon}`]"></i>
		</span>
		<span class="heading-text">
			{{ props.title }}
		</span>
		<span class="heading-break-line">
			&nbsp;
		</span>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

	/**
	 * A Section Heading
	 */
	@Component({
		name: 'SectionHeading'
	})
export default class Tag extends Vue {

	/* Props
        ============================================*/

		// Title of the Section
		@Prop({type: String, required: true})
		readonly title: string

		// Font icon name (optional)
		@Prop({type: String, required: false})
		readonly icon: string
}
</script>

<style lang="scss">
	$defaultTextSize: 1.7rem;

	.heading-container {
		display: flex;
		padding: 1.0rem 0;
	}

	.heading-icon {
		display: inline-block;
		font-size: $defaultTextSize;
		padding-right: 1.3rem;
	}

	.heading-text {
		display: inline-block;
		font-size: $defaultTextSize;
		padding-right: 1rem;
	}

	.heading-break-line {
		box-sizing: border-box;
		height: 15px;
		border-bottom: 3px solid $grey;
		flex: 1;
	}
</style>
