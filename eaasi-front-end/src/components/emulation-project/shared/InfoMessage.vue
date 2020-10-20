<template>
	<div :class="`info-message ${type}`">
		<div class="flex flex-row justify-between">
			<div class="left">
				<span class="far fa-exclamation-triangle"></span>
				{{ message }}
			</div>
			<span v-if="collapsible" class="fas close fa-chevron-down" @click="toggle"></span>
		</div>
		<p v-show="description && showDescription">{{ description }}</p>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';

export type InfoType = 'error';

@Component({
	name: 'InfoMessage'
})
export default class InfoMessage extends Vue {

	/* Props
	============================================*/
	@Prop({ type: String as () => InfoType, required: true })
	readonly type: InfoType;

	@Prop({ type: String, required: true })
	readonly message: string;

	@Prop({ type: String, required: false })
	readonly description: string;

	@Prop({ type: Boolean, default: false })
	readonly collapsible: boolean;

	showDescription: boolean = true;

	toggle() {
		this.showDescription = !this.showDescription;
	}

}
</script>

<style lang='scss'>
.info-message {
	border-radius: 0.6rem;
	margin-bottom: 1.5rem;
	padding: 1.5rem 1rem;

	.left {

		span {
			font-size: 2rem;
			margin-right: 1rem;
		}
	}

	.close {
		cursor: pointer;
	}

	p {
		margin-bottom: 0;
		margin-top: 1rem;
	}

	&.error {
		background-color: lighten($red, 90%);
		border: 2px solid lighten($red, 60%);
		color: darken($red, 40%);

		span {
			color: darken($red, 20%);
		}

		p {
			color: darken($dark-neutral, 40%);
		}
	}
}
</style>