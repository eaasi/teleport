<template functional>
	<div>
		<div class="icon">
			<div v-if="props.alertType === 'error' || props.alertType === 'warning'">
				<i class="fas fa-exclamation-triangle"></i>
			</div>
			<div v-else-if="props.alertType === 'success'">
				<i class="fas fa-check-circle"></i>
			</div>
			<div v-else-if="props.alertType === 'info'">
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
import isValidAlert from '@/types/validators/AlertType.validator';

/**
 * An alert icon + message combo
 */
@Component({
	name: 'Alert'
})
export default class Alert extends Vue {
	@Prop({ validator: isValidAlert, required: false })
    alertType
};
</script>
