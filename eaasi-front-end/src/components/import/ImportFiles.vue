<template>
	<div class="import-resource-files padded">
		<div v-if="!filesAreAdded">
			<h3>{{ headline }}</h3>
			<div class="row">
				<div class="col-md-6">
					<div class="irf-option">
						<span class="text-center">URL</span>
						<text-input
							label="File Location"
							rules="url"
							v-model="fileUrl"
						/>
					</div>
				</div>
				<div class="col-md-6">
					<div class="irf-option text-center">
						<span>My Computer</span>
						<file-upload-button
							@change="addFiles"
							:limit="isEnvImport ? 1 : Infinity"
						/>
					</div>
				</div>
			</div>
		</div>
		<div v-if="filesAreAdded && !isEnvImport">
			<div class="flex-row justify-between mb-lg">
				<h3 class="no-mb">{{ files.length }} files attached to this resource.</h3>
				<file-upload-button
					secondary
					@change="addFiles"
					icon="plus"
					button-label="Add More Files"
					:limit="isEnvImport ? 1 : Infinity"
				/>
			</div>
		</div>
		<div v-if="filesAreAdded && isEnvImport">
			<div class="flex-row justify-between mb-lg">
				<text-input
					readonly
					:value="files[0].name"
					label="Disk Image"
					class="flex-adapt"
				/>
				<ui-button
					style="margin-left: 2rem;"
					size="small"
					secondary
					@click="files = []"
				>
					Change
				</ui-button>
			</div>
		</div>
		<br />
		<div class="row" v-if="!isEnvImport">
			<div class="col-md-12">
				<div class="software-file-uploader">
					<file-dropzone
						v-show="!filesAreAdded"
						@change="addFiles"
						:limit="isEnvImport ? 1 : Infinity"
					/>
					<div class="sfu-file-list" v-if="filesAreAdded">
						<draggable
							v-model="files"
							@sort="sorted"
							handle=".sfl-handle"
						>
							<resource-file-list-item
								v-for="f in files"
								:key="f.name"
								:file="f"
							/>
						</draggable>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import { Get, Sync } from 'vuex-pathify';
import Draggable from 'vuedraggable';
import ResourceFileListItem from './ResourceFileListItem.vue';
import ResourceImportFile from '@/models/import/ResourceImportFile';
import { ImportType } from '@/types/Import';

@Component({
	name: 'ImportFiles',
	components: {
		Draggable,
		ResourceFileListItem
	}
})
export default class ImportFiles extends Vue {

	/* Computed
	============================================*/

	@Sync('import/filestoUpload')
	files: ResourceImportFile[]

	@Sync('import/importType')
	importType: ImportType

	@Sync('import/importStep')
	step: number

	get filesAreAdded(): boolean {
		return !!this.files.length;
	}

	get isEnvImport() {
		return this.importType === 'environment';
	}

	get headline() {
		if (this.isEnvImport) {
			return 'I will attach my disk image from...';
		}
		return 'I will attach files to this resource from...';
	}

	/* Data
	============================================*/

	fileUrl: string = '';

	/* Methods
	============================================*/

	addFiles(fileList: File[]) {
		let startingSortIndex = this.files.length + 1;
		for(let i=0; i<fileList.length; i++) {
			let f = fileList[i];
			if(this.files.some(x => x.name === f.name)) continue;
			this.files.push(new ResourceImportFile(f, startingSortIndex + i));
		}
		this.step = 3;
	}

	sorted() {
		let files = [...this.files];
		for(let i=0; i<files.length; i++) {
			files[i].sortIndex = i + 1;
		}
		this.files = files;
	}

	@Watch('filesAreAdded')
	onFilesAreAddedChange(filesAreAdded) {
		// Ensure user are on the final step if files have been added
		if(filesAreAdded && this.step !== 3) this.step = 3;
	}

}

</script>

<style lang="scss">
.irf-option {
	background-color: lighten($light-neutral, 50%);
	height: 9.5rem;
	padding: 2rem;
	> span {
		color: darken($dark-neutral, 40%);
		display: block;
		font-size: 1.6rem;
		font-weight: bold;
		margin-bottom: 1.7rem;
	}
}
</style>