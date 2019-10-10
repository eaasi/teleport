<template>
	<div class="select-import-path">
		<div v-if="value === 'Unselected'">
			<h3>How would you like to import?</h3>
			<br />
			<div class="row" style="max-width: 80rem;">
				<div class="col-md-6">
					<big-button
						block
						icon="bolt"
						label="Fast Import"
						info="You will need to add additional metadata if you choose to save the resource to your node or the network."
						sub-label="You want to use this resource in an emulator as soon as possible."
						@click="$emit('input', 'Fast')"
					/>
				</div>
				<div class="col-md-6 flex">
					<big-button
						block
						icon="list"
						label="Detailed Import"
						info="Enter detailed metadata on import if you plan to save resources to your node library or share to the network."
						sub-label="You plan to save this resource to your node library and/or the node network."
						@click="$emit('input', 'Detailed')"
					/>
				</div>
			</div>
		</div>

		<div v-if="value !== 'Unselected'">
			<div class="flex-row justify-between">
				<h3>About This Resource</h3>
				<dual-toggle
					:options="['Fast', 'Detailed']"
					:value="value"
					@input="$emit('input', $event)"
				/>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { ResourceImportPath } from '@/types/Import';

@Component({
	name: 'ImportPathSelect',
})
export default class ImportPathSelect extends Vue {

	/* Props
	============================================*/

	/**
	 * ResourceImportPath value to be used with v-model directive
	 */
	@Prop({type: String, required: true})
	readonly value: ResourceImportPath | null;

}

</script>

<style lang="scss">
.select-import-path {
	h3 {
		margin-bottom: 0;
	}
}
</style>