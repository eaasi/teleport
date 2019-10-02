<template>
	<div id="importResource">
		<h1 class="padded no-mb">Import Resource</h1>
		<import-progress />
		<section class="import-wrapper flex">
			<div class="import-content">
				<import-select v-if="step >= 0" />
				<import-metadata v-if="step === 1" />
				<import-files v-if="step === 2" />
				<import-finished v-if="step === 3" />
			</div>
			<div class="import-tip-lane padded"></div>
		</section>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { Sync } from 'vuex-pathify';
import ImportProgress from './ImportProgress.vue';
import ImportFiles from './ImportFiles.vue';
import ImportMetadata from './ImportMetadata.vue';
import ImportSelect from './ImportSelect.vue';
import ImportFinished from './ImportFinished.vue';

@Component({
	name: 'ImportResourceScreen',
	components: {
		ImportProgress,
		ImportSelect,
		ImportFiles,
		ImportMetadata,
		ImportFinished
	}
})
export default class ImportResourceScreen extends Vue {

	/* Props
	============================================*/

	/* Data
	============================================*/

	@Sync('import/importStep')
	step: number

	/* Computed
	============================================*/

	/* Methods
	============================================*/

	/* Lifecycle Hooks
	============================================*/

	/* Watchers
	============================================*/

}

</script>

<style lang="scss">

#importResource {
	background-color: #FFFFFF;
}

.import-content {
	flex: 1 1 auto;
}

.import-tip-lane {
	flex: 0 0 $tipLaneWidth;
}
</style>