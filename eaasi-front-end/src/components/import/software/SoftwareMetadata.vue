<template>
	<div class="software-metadata">
		<import-path-select v-model="importPath" />
		<div v-if="importPath === 'Fast'" class="im-fast padded">
			<eaasi-form ref="_form">
				<software-form />
				<ui-button @click="$refs._form.submit()">
					Next
				</ui-button>
			</eaasi-form>
		</div>
		<div v-if="importPath === 'Detailed'" class="im-fast padded">
			<eaasi-form ref="_form">
				<collapsable title="General" class="mb-lg">
					<software-form />
				</collapsable>
				<collapsable title="Versions">
					<div v-for="(v, i) in versions" :key="v.id">
						<h4>Version {{ i + 1 }}</h4>
						<software-version-form :version="v" />
					</div>
					<ui-button
						block
						secondary
						icon="plus"
						@click="addSoftwareVersion"
					>
						Add Version
					</ui-button>
				</collapsable>

				<collapsable title="System Requirements">
					<software-requirements-form />
				</collapsable>
				<ui-button @click="$refs._form.submit()">
					Next
				</ui-button>
			</eaasi-form>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import ImportPathSelect from '../ImportPathSelect.vue';
import { ResourceImportPath } from '@/types/Resource';
import SoftwareForm from '@/components/import/software/SoftwareForm.vue';
import SoftwareVersionForm from '@/components/import/software/SoftwareVersionForm.vue';
import SoftwareRequirementsForm from '@/components/import/software/SoftwareRequirementsForm.vue';
import EaasiForm from '@/components/global/software/EaasiForm.vue';

@Component({
	name: 'SoftwareMetadata',
	components: {
		ImportPathSelect,
		SoftwareForm,
		SoftwareRequirementsForm,
		SoftwareVersionForm
	}
})
export default class SoftwareMetadata extends Vue {

	$refs!: {
		_form: EaasiForm
	}

	/* Props
	============================================*/

	/* Data
	============================================*/

	importPath: ResourceImportPath = 'Unselected';
	versions: any[] = [{id: 1}] // TODO:

	/* Computed
	============================================*/

	/* Methods
	============================================*/

	addSoftwareVersion() {
		// TODO:
		let id = Math.max.apply(null, this.versions.map(x => x.id)) + 1;
		this.versions.push({id});
	}

	/* Lifecycle Hooks
	============================================*/

	/* Watchers
	============================================*/

}

</script>

<style lang="scss">
.software-metadata {
	.collapsable {
		margin-bottom: 2rem;
	}
}
</style>