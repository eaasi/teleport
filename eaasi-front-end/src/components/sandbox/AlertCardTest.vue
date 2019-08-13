<template>
	<div class="alert-row">
		<alert-card type="info" class="inline-block">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit,
			sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
			Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
			nisi ut aliquip ex ea commodo consequat.
		</alert-card>

		<alert-card type="success" class="inline-block">
			Success!
		</alert-card>

		<alert-card type="warning" class="inline-block">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit,
			sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
			Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
			nisi ut aliquip ex ea commodo consequat.
		</alert-card>

		<alert-card type="error" class="inline-block">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit,
			sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
			Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
			nisi ut aliquip ex ea commodo consequat.
		</alert-card>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AlertCard from '../global/AlertCard.vue';
	@Component({
		components: {AlertCard}
	})
export default class AlertCardTest extends Vue {
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
