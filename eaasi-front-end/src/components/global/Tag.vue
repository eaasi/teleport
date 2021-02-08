<template functional>
	<div :class="['eaasi-tag', props.color]">
		<span>
			<span v-if="props.externalIcon" class="tag-icon">
				<span :class="['icon', 'fas', ...props.externalIcon.split(' ')]"></span>
			</span>
			<span class="eaasi-icon">
				{{ props.icon }}
			</span>
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
	 * The custom EaaSI UI icon name displayed in the Tag
	 */
    @Prop({type: String, required: false})
    readonly icon: string;

	/**
	 * The FontAwesome icon name displayed in the Tag
	 */
	@Prop({type: String, required: false})
	readonly externalIcon: string;

	/**
	 * The color of the Tag
	 */
    @Prop({type: String, required: false})
    readonly color: string;
}
</script>

<style lang="scss">
	.eaasi-tag {
		align-items: center;
		background-color: #FFFFFF;
		border: solid 1px #E5E1DF;
		border-radius: 0.5rem;
		display: flex;
		height: 18px;
		justify-content: center;
		margin: 0 1px;
		padding: 0 5px;

		.tag-text {
			font-size: 1.2rem;
			font-weight: 200;
			padding: 0 4px 0 2px;
		}

		@font-face {
			font-family: EaasiIcon;
			src: url('../../assets/EaaSI_icons.ttf') format('truetype');
		}

		.icon {
			color: rgba(0, 0, 0, 0.7);
			font-size: 1.3rem;
			margin-right: 0.3rem;
		}

		.eaasi-icon {
			color: rgba(0, 0, 0, 0.7);
			font-family: EaasiIcon, fantasy;
			font-size: 1.6rem;
		}

		&.yellow {
			background-color: #F1EDBF;
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
