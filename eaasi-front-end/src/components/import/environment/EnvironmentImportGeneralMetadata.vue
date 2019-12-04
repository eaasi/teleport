<template>
	<div class="env-import-general-metadata">
		<text-input
			label="Environment Name"
			rules="required"
			placeholder="Enter a name or title for this resource"
			v-model="title"
		/>
		<text-area-input
			label="Environment Description"
			placeholder="Enter a description..."
		/>
		<descriptive-radios
			:options="environmentTypes"
			v-model="environmentType"
		/>
		<br />
		<row>
			<column size="6">
				<text-input
					label="Local Identifier"
				/>
			</column>
			<column size="6">
				<text-input
					label="Local Identifier Source"
				/>
			</column>
			<column size="12">
				<text-input
					label="Software Included"
				/>
			</column>
		</row>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { Sync } from 'vuex-pathify';
import EaasiForm from '@/components/global/forms/EaasiForm.vue';
import { IRadioOption } from '@/types/Forms';

@Component({
	name: 'EnvironmentImportGeneralMetadata'
})
export default class EnvironmentImportGeneralMetadata extends Vue {

	$refs!: {
		_form: EaasiForm
	};

	/* Computed
	============================================*/

	@Sync('import/environment@title')
	readonly title: string;

	@Sync('import/environment@type')
	readonly environmentType: number;

	/* Data
	============================================*/

	environmentTypes: IRadioOption[] = [
		{
			label: 'Base Environment',
			value: 1,
			description: 'Image of a hard drive with an OS'
		},
		{
			label: 'Content Environment',
			value: 2,
			description: 'Image of a hard drive with an OS & content files'
		}
	]
}

</script>

<style lang="scss">
</style>