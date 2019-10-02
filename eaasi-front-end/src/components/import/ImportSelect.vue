<template>
	<div class="import-select">
		<div v-if="type" class="import-selected padded">
			<div class="flex-row">
				<p>I want to import a</p>
				<select-list v-model="type" class="no-mb flex-adapt">
					<option value="file">Content File</option>
					<option value="software">Software Resource</option>
					<option value="environment">Enrivonment Resource</option>
					<option value="bulk">Bulk Import</option>
				</select-list>
			</div>
		</div>
		<div class="import-types padded" v-else>
			<h3>I want to import a...</h3>
			<div class="row">
				<div class="col-md-4">
					<options-box title="Content File(s)" icon="file">
						Like a folder, disc image, or individual file
						<template slot="footer">
							<ui-button
								block
								sub-label="Examples: .jpg / .doc / .cdr / .pdf / .xd / .psd / .wav / etc"
								@click="chooseImportType('file')"
							>
								Import Content
							</ui-button>
						</template>
					</options-box>
				</div>

				<div class="col-md-4">
					<options-box title="Software Resource" icon="file">
						Software disk image, install file, or files
						<template slot="footer">
							<ui-button
								block
								sub-label="Examples: .exe / dmg / .iso / .e01 / etc."
								@click="chooseImportType('software')"
							>
								Import Software
							</ui-button>
						</template>
					</options-box>
				</div>

				<div class="col-md-4">
					<options-box title="Environment Resource" icon="file" header="Less Common">
						Image of a hard drive with an operating system, content files optional
						<template slot="footer">
							<ui-button
								block
								sub-label="Examples: .iso / .dd / .raw / .e01"
								@click="chooseImportType('environment')"
							>
								Import Environment
							</ui-button>
						</template>
					</options-box>
				</div>
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
	border-bottom: solid 2px darken($light-neutral, 10%);

	.eaasi-select {
		margin-left: 1rem;
		max-width: 40rem;
	}

	p {
		font-size: 1.8rem;
		margin-bottom: 0;
	}
}

.import-types {
	background-color: #FFFFFF;
	.eb-wrapper {
		flex: 0 0 31%;
		margin-bottom: 3rem;
	}
}
</style>