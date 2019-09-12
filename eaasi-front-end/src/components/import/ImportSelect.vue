<template>
	<div class="import-select">
		<div v-if="type" class="import-selected padded">
			<div class="flex-row">
				<p>I want to import a</p>
				<select-list v-model="type" class="no-mb flex-grow">
					<option value="file">Content File</option>
					<option value="software">Software Resource</option>
					<option value="environment">Enrivonment Resource</option>
					<option value="bulk">Bulk Import</option>
				</select-list>
			</div>
		</div>
		<div class="flex flex-wrap import-types justify-between padded" v-else>
			<h3>I want to import a...</h3>
			<div class="flex flex-wrap import-types justify-between">
				<big-button
					label="Content File"
					sublabel="Like a folder, disc image, or individual file"
					icon="upload"
					subtext="Examples: .jpg / .doc / .cdr / .pdf / .xd / .psd / .wav / etc"
					@click="chooseImportType('file')"
				/>
				<big-button
					label="Software Resource"
					sublabel="Software disk image, install file, or files"
					icon="upload"
					subtext="Examples: .exe / dmg / .iso / .e01 / etc."
					@click="chooseImportType('software')"
				/>
				<big-button
					label="Environment Resource"
					sublabel="Image of a hard drive with an operating system, content files optional"
					icon="upload"
					subtext="Examples: .iso / .dd / .raw / .e01"
					@click="chooseImportType('environment')"
				/>
				<big-button
					label="Bulk Import"
					sublabel="Import files in bulk."
					icon="upload"
					subtext="Examples: .xml"
					@click="chooseImportType('bulk')"
				/>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { Sync } from 'vuex-pathify';
import { ImportType } from 'eaasi-import';

@Component({
	name: 'ImportSelect'
})
export default class ImportSelect extends Vue {

	/* Props
	============================================*/

	/* Data
	============================================*/

	/* Computed
	============================================*/

	@Sync('import/importStep')
	step: number

	@Sync('import/importType')
	type: ImportType

	/* Methods
	============================================*/

	chooseImportType(type: ImportType) {
		this.type = type;
		this.step++;
	}

	/* Lifecycle Hooks
	============================================*/

	/* Watchers
	============================================*/

}

</script>

<style lang="scss">

.import-select h3 {
	box-sizing: border-box;
	margin-bottom: 2rem;
}

.import-selected {
	background-color: lighten($light-neutral, 80%);
	border-bottom: solid 2px #d5d5d5;

	.eaasi-select {
		margin-left: 1rem;
		max-width: 40rem;
	}
}

.import-types {

	.eb-wrapper {
		flex: 0 0 31%;
		margin-bottom: 3rem;
	}

	.eaasi-big-button {
		height: 10rem;
	}
}
</style>