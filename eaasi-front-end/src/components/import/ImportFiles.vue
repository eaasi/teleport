<template>
	<div class="import-files">
		<software-files-import v-if="type === 'software'" />
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { Get } from 'vuex-pathify';
import { ImportType } from '@/types/Import';
import SoftwareFilesImport from './software/SoftwareFilesImport.vue';

@Component({
	name: 'ImportFiles',
	components: {
		SoftwareFilesImport
	}
})
export default class ImportFiles extends Vue {

	/* Computed
	============================================*/

	@Get('import/importType')
	readonly type: ImportType

}

</script>

<style lang="scss"></style>