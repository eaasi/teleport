<template>
	<div class="alert-row">
		<alert-card
			text="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
			type="success"
			class="inline-block"
		/>

		<alert-card
			text="Lorem ipsum dolor sit amet, consectetur adipiscing elit,
			sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
			type="info"
			class="inline-block"
		/>

		<alert-card
			text="Lorem ipsum dolor sit amet, consectetur adipiscing elit,
			sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
			Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
			nisi ut aliquip ex ea commodo consequat."
			type="warning"
			class="inline-block"
		/>

		<alert-card
			text="Lorem ipsum dolor sit amet, consectetur adipiscing elit,
			sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
			Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
			nisi ut aliquip ex ea commodo consequat."
			type="error"
			class="inline-block"
		/>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AlertCard from '../global/AlertCard.vue';
	@Component({
		components: {AlertCard}
	})
export default class NumberedStepsTest extends Vue {
}
</script>

<style lang="scss">
	.darker {
		background-color: $light-warm-grey;
	}

	.alert-row {
		display: flex;
		flex-direction: row;
	}
</style>
