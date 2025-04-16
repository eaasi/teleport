<template functional>
	<div class="tips-card-container">
		<div class="tips-title">
			<span class="fas fa-lightbulb"></span>
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
import { Component } from 'vue-property-decorator';

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
		background-color: $light-grey;
		border: 2px dashed $medium-grey;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		line-height: 2.2rem;
		min-height: 24rem;
		padding: 2.4rem;
		width: 25rem;
	}

	.tips-title {
		font-size: 1.8rem;
		margin: 1.2rem 0;
	}

	.tips-content {
		color: $medium-grey;
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
