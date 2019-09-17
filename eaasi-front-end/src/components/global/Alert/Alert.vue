<template functional>
	<div>
		<div class="icon">
			<div v-if="props.iconType === 'error' || props.iconType === 'warning'">
				<i class="fas fa-exclamation-triangle"></i>
			</div>
			<div v-else-if="props.iconType === 'success'">
				<i class="fas fa-check-circle"></i>
			</div>
			<div v-else-if="props.iconType === 'info'">
				<i class="fas fa-info-circle"></i>
			</div>
		</div>
		<div class="content">
			<slot></slot>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

/**
 * An alert icon + message combo
 */
@Component({
	name: 'Alert'
})
export default class Alert extends Vue {
	@Prop({type: String, required: false})
	iconType
};
</script>

<style lang="scss">
</style>