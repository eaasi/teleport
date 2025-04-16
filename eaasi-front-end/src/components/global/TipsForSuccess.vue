<template functional>
	<div class="tips-container">
		<div class="tips-header txt-sm">
			<span class="far fa-lightbulb"></span>
			Tips for Success
		</div>
		<div>
			<slot></slot>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

/**
 * A styled container for tips for users
 * @example ../docs/TipsForSuccess.Example.md
 */
@Component({
	name: 'TipsForSuccess'
})
export default class TipsForSuccess extends Vue {}
</script>

<style lang="scss">

.tips-container {
	border-left: 3px solid $dark-light-grey;
	color: $dark-light-grey;
	padding: 0.2rem 0 0.2rem 0.7rem;

	.tips-header {
		span {
			margin: 0 0.5rem 0 0.2rem;
		}
		margin-bottom: 1rem;
	}
}

</style>
