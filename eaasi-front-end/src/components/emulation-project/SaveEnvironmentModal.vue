<template>
	<modal>
		<template #header>
			<div class="cm-modal-header">
				<h3>Save environment configuration</h3>
			</div>
		</template>
		<div>
			<text-input label="New environment title" required v-model="label" />
		</div>
		<template #footer>
			<div class="footer-btn-wrapper">
				<div class="flex-row pull-right">
					<ui-button @click="$emit('close')" color-preset="white">
						Cancel
					</ui-button>
					<ui-button
						@click="$emit('save', label)"
					>
						Save
					</ui-button>
				</div>
			</div>
		</template>
	</modal>
</template>
<script lang="ts">
import { Component } from 'vue-property-decorator';
import { Get } from 'vuex-pathify';
import Vue from 'vue';

@Component({
	name: 'SaveEnvironmentModal',
})
export default class SaveEnvironmentModal extends Vue {

	@Get('emulationProject/createEnvironmentPayload@label')
	initialLabel: string;

	label: string;

	created() {
		this.label = this.initialLabel;
	}

}
</script>

<style lang='scss' scoped>
.cm-modal-header {
	border-bottom: 4px solid darken($light-neutral, 10%);
	padding: 2rem 0 0.5rem 1rem;
}

.footer-btn-wrapper {
	background-color: lighten($light-neutral, 80%);
	border-top: 2px solid darken($light-neutral, 10%);
	min-height: 4rem;
	padding: 2rem;

	.ui-btn-container {
		margin-left: 1rem;
	}
}
</style>