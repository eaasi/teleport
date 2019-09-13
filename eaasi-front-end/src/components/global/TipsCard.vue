<template functional>
	<div class="tips-card-container">
		<div class="tips-title">
			<i :class="`fas fa-lightbulb`"></i>
			<span class="tips">TIPS</span>
		</div>
		<div class="tips-content">
			<slot></slot>
		</div>
		<div class="tips-content-secondary">
			<slot name="secondary-content"></slot>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

/**
 * Provides a card for communicating tips to the user
 */
@Component({
	name: 'TipsCard'
})
export default class TipsCard extends Vue {
}
</script>

<style lang="scss">
	.tips-card-container {
		background-color: lighten($light-neutral, 30%);
		border: 2px dashed darken($light-neutral, 10%);
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		min-height: 28rem;
		padding: 2.4rem;
		width: 28rem;
	}

	.tips-title {
		font-size: 1.8rem;
		margin: 3.2rem 0;
	}

	.tips-content {
		color: lighten($dark-neutral, 10%);
		line-height: 2.2rem;
		margin: 1.2rem 0;
	}

	.tips-content-secondary {
		color: #000000;
		margin: 1.2rem 0;
	}

	.tips {
		margin-left: 1.2rem;
	}

</style>
