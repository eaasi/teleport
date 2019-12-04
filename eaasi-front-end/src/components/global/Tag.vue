<template functional>
	<div :class="['eaasi-tag', props.color]">
		<span v-if="props.icon" class="tag-icon">
			<span :class="['icon', 'fas', props.icon]"></span>
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
 * Tags are rectangular elements that can be used to
 * add context to adjacent or surrounding content.
* @example ../docs/Tag.Example.md
*/
@Component({
	name: 'Tag'
})
export default class Tag extends Vue {
	/* Props
    ============================================*/
	/**
	 * The text displayed in the Tag
	 */
    @Prop({type: String, required: true})
    readonly text: string;

    /**
	 * The FontAwesome icon name displayed in the Tag
	 */
    @Prop({type: String, required: false})
    readonly icon: string;

    /**
	 * The color of the Tag
	 */
    @Prop({type: String, required: false})
    readonly color: string;
}
</script>

<style lang="scss">
	.eaasi-tag {
		background-color: #ffffff;
		border: solid 1px #DDDDDD;
		border-radius: 0.6rem;
		color: #000000;
		display: inline-block;
		font-size: 1.1rem;
		height: 20px;
		line-height: 20px;
		margin: 0 1px;
		padding: 0 8px;

		.icon {
			color: rgba(0, 0, 0, 0.5);
			margin-right: 0.4em;
		}

		&.yellow {
			background-color: #F8F7DF;
		}

		&.blue {
			background-color: lighten($light-blue, 90%);
		}

		&.red {
			background-color: lighten($red, 75%);
		}

		&.green {
			background-color: lighten($green, 85%);
		}
	}
</style>
