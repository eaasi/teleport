<template functional>
	<div :class="['eaasi-tag', props.color]">
		<span class="tag-icon">
			<i :class="['fas', props.icon]"></i>
		</span>
		<span class="tag-text">
			{{ props.text }}
		</span>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

	/**
	 * A Rectangular Tag containing an Icon and short Text
	 */
	@Component({
		name: 'Tag'
	})
export default class Tag extends Vue {

	/* Props
    ============================================*/

		// Tag display text
		@Prop({type: String, required: true})
		readonly text: string

		// Font icon name (optional)
		@Prop({type: String, required: false})
		readonly icon: string

		// Tag background color
		@Prop({type: String, required: false})
		readonly color: string
}
</script>

<style lang="scss">
	.eaasi-tag {
		display: inline-block;
		height: 20px;
		line-height: 20px;
		background-color: #fff;
		border: solid 1px $lighter-grey;
		border-radius: 0.6rem;
		color: black;
		font-size: 1.1rem;
		margin: 0 1px;
		padding: 0 8px;

		i {
			margin-right: 0.4em;
			color: rgba(0, 0, 0, 0.4);
		}

		&.yellow {
			background-color: $pale-yellow;
		}

		&.blue {
			background-color: $light-sky-blue;
		}

		&.red {
			background-color: $lighter-red;
		}

		&.green {
			background-color: $lighter-success-green;
		}
	}
</style>
