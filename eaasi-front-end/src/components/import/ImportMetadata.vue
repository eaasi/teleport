<template>
	<div class="import-metadata">
		<software-metadata v-if="type === 'software'" />
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import SoftwareMetadata from '@/components/import/software/SoftwareMetadata.vue';
import { Get } from 'vuex-pathify';
import { ImportType } from 'eaasi-import';

@Component({
	name: 'ImportMetadata',
	components: {
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