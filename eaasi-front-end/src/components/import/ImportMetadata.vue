<template>
	<div class="import-metadata">
		<software-metadata v-if="type === 'software'" />
		<environment-import-metadata v-if="type === 'environment'" />
		<content-import-metadata v-if="type === 'content'" />
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import SoftwareMetadata from '@/components/import/software/SoftwareMetadata.vue';
import EnvironmentImportMetadata from '@/components/import/environment/EnvironmentImportMetadata.vue';
import ContentImportMetadata from '@/components/import/content/ContentImportMetadata.vue';
import { Get } from 'vuex-pathify';
import { ImportType } from '@/types/Import';

@Component({
	name: 'ImportMetadata',
	components: {
		ContentImportMetadata,
		EnvironmentImportMetadata,
		SoftwareMetadata
	}
})
export default class ImportMetadata extends Vue {

	/* Computed
	============================================*/

	@Get('import/importType')
	readonly type: ImportType

}

</script>

<style lang="scss">

</style>