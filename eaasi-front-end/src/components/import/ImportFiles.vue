<template>
	<div class="import-files">
		<import-resource-files />
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { Get } from 'vuex-pathify';
import { ImportType } from '@/types/Import';
import ImportResourceFiles from './ImportResourceFiles.vue';

@Component({
	name: 'ImportFiles',
	components: {
		ImportResourceFiles
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