<template>
	<div v-if="files.length > 0" class="lil-container">
		<div v-for="file in files" :key="file.id">
			<div class="li-container editable-container readonly">
				<div class="li-label">
					{{ file.dataResourceType }} ({{ file.type }})
				</div>
				<text-input
					class="input-wrapper"
					style="margin-bottom: 1rem;"
					:value="file.localAlias ? file.localAlias : file.id"
					readonly
				/>
			</div>
		</div>
	</div>
	<div v-else class="lil-container">
		<span class="lil-no-data">No Data</span>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import { IContentFile } from '../../../../types/Resource';

@Component({
    name: 'MediaFilesList'
})
export default class MediaFilesList extends Vue {

    /* Props
    ============================================*/
    @Prop({ type: Array as () => IContentFile[] })
    files: IContentFile[];

    /* Computed
    ============================================*/

    /* Data
    ============================================*/

    /* Methods
    ============================================*/

    /* Lifecycle Hooks
    ============================================*/

}
</script>

<style lang='scss'>

</style>