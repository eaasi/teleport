<template functional>
	<div class="heading-container">
		<span v-if="props.icon" class="heading-icon">
			<i :class="['fa', `fas ${props.icon}`]"></i>
		</span>
		<span :class="['heading-text', props.size]">
			{{ props.title }}
		</span>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

/**
 * A Section Heading
 * @example ../docs/SectionHeading.Example.md
 */
@Component({
	name: 'SectionHeading'
})
export default class SectionHeading extends Vue {
	/* Props
    ============================================*/

    // Title of the Section
    @Prop({type: String, required: true})
    readonly title: string

	// Size Modifier
	@Prop({type: String, required: false, validator: (val) => ['small', 'medium', 'large'].indexOf(val) != -1})
	readonly size: string = 'medium'

    // Font icon name (optional)
    @Prop({type: String, required: false})
    readonly icon: string
}
</script>

<style lang="scss">
	$defaultTextSize: 1.7rem;

	.heading-container {
		display: flex;
		padding: 1rem 0;
	}

	.heading-icon {
		display: inline-block;
		font-size: $defaultTextSize;
		padding-right: 1.3rem;
	}

	.heading-text {
		display: inline-block;
		padding-right: 1rem;
	}

	.small {
		font-size: 1.2rem;
	}

	.medium {
		font-size: 1.6rem;
	}

	.large {
		font-size: 2rem;
	}
</style>
