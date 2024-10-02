<template>
	<div class="import-resource-files padded">
		<!-- No Files Added -->
		<div v-if="!filesAreAdded && !urlAdded">
			<h3>{{ headline }}</h3>
			<div class="row justify-left" style="margin-top: 3rem;">
				<div class="col-md-12 import-option-block" v-if="isImageImport">
					<text-input
						class="image-url-input"
						@change="checkUrl"
						label="File URL"
						rules="url"
						v-model="urlSource"
						ref="urlField"
						required
					/>
					<ui-button
						v-if="isImageImport"
						@click="onContinue"
						:disabled="!isUrlSource"
						icon-right
						icon="chevron-right"
					>
						Continue
					</ui-button>
				</div>
			</div>
		</div>

		<div v-if="urlAdded">
			<div class="flex-row">
				<div class="flex-column file-message">
					<div class="no-mb">1 file attached to this resource.</div>
				</div>
			</div>
			<div class="flex-row">
				<resource-url-item :file-url="urlSource" />
			</div>
		</div>

		<!-- Files Added, Non-Environment Import -->

		<div v-if="filesAreAdded" class="if-attached">
			<div class="flex-row justify-start mb-lg if-file-buttons" v-if="files && files.length && !isImageImport">
				<ui-button
					icon="check"
					color-preset="white"
					@click="selectAllFiles"
				>
					Select All
				</ui-button>
				<ui-button
					icon="times"
					color-preset="white"
					@click="selectNoFiles"
					:disabled="!selectedFiles.length"
				>
					Select None
				</ui-button>
				<ui-button
					icon="trash"
					color-preset="white"
					@click="removeSelectedFiles"
					class="if-trash-file"
					:disabled="!selectedFiles.length"
				>
					Remove Selected Files
				</ui-button>
			</div>

			<div class="flex-row justify-between mb-lg">
				<div class="flex-column file-message">
					<div class="no-mb" v-if="files.length === 1">{{ files.length }} file attached to this resource.</div>
					<div class="no-mb" v-if="files.length > 1">{{ files.length }} files attached to this resource.</div>
					<div v-if="files.length > 1">Drag and drop files using the handle on the right-hand side to change their order.</div>
				</div>
				<file-upload-button
					secondary
					@change="addFiles"
					icon="plus"
					button-label="Add More Files"
					:limit="fileLimit"
				/>
			</div>
		</div>

		<br />

		<div class="row" v-if="!isImageImport">
			<div class="col-md-12 col-sm-12">
				<div class="software-file-uploader">
					<file-dropzone
						v-show="!filesAreAdded"
						@change="addFiles"
						:limit="fileLimit"
					>
						<file-upload-button
							@change="addFiles"
							:limit="fileLimit"
							button-label="Browse My Computer"
							secondary
						/>
					</file-dropzone>
					<div class="sfu-file-list" v-if="filesAreAdded">
						<draggable
							v-model="files"
							@sort="sorted"
							handle=".sfl-handle"
						>
							<resource-file-list-item
								v-for="file in files"
								:key="file.name"
								:file="file"
								@sort="sortOnInput"
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
	import {isValidUrl} from '@/helpers/UrlHelper';
	import BaseHttpService from '@/services/BaseHttpService';
	import { Component, Watch } from 'vue-property-decorator';
	import { Sync, Get } from 'vuex-pathify';
	// noinspection TypeScriptCheckImport
	import Draggable from 'vuedraggable';
	import ResourceFileListItem from './ResourceFileListItem.vue';
	import ResourceImportFile from '@/models/import/ResourceImportFile';
	import { ImportType, IResourceImportFile } from '@/types/Import';
	import {operatingSystems} from '@/models/admin/OperatingSystems';
	import ResourceUrlItem from './ResourceUrlItem.vue';

	let http = new BaseHttpService();

	@Component({
		name: 'ImportFiles',
		components: {
			ResourceUrlItem,
			Draggable,
			ResourceFileListItem,
		}
	})
	export default class ImportFiles extends Vue {

		/* Computed
        ============================================*/

		@Sync('import/filesToUpload')
		files: IResourceImportFile[];

		@Sync('import/selectedFiles')
		selectedFiles: IResourceImportFile[];

		@Sync('import/importType')
		importType: ImportType;

		@Sync('import/importStep')
		step: number;

		@Sync('import/environment@urlSource')
		urlSource: string;

		@Sync('import/environment@diskSize')
		diskSize: string;

		@Sync('import/environment@isKvmEnabled')
		isKvmEnabled: boolean;

		@Sync('import/environment@nativeFMTs')
		nativeFMTs: string[];

		@Get('import/isImageImport')
		readonly isImageImport: boolean;

		get filesAreAdded(): boolean {
			return !!this.files.length;
		}

		get urlAdded(): boolean {
			return this.isImageImport && !!this.urlSource && this.step === 3;
		}

		get headline() {
			if (this.isImageImport) {
				return 'I will attach my disk image from...';
			}
			return 'I will attach files to this resource from...';
		}

		get isUrlSource(): boolean {
			return isValidUrl(this.urlSource);
		}

		/* Data
        ============================================*/

		selectedOs: string = null;
		readonly operatingSystems = operatingSystems;
		fileLimit: number = 500000000;

		/* Methods
		============================================*/

		checkUrl() {
			// noinspection TypeScriptUnresolvedVariable
			this.$refs.urlField['canValidate'] = true;
			// noinspection TypeScriptUnresolvedVariable,TypeScriptUnresolvedFunction
			let validate = this.$refs.urlField['validate'];
			validate();
			//this.step = this.isUrlSource ? 3 : 2;
		}


		addFiles(fileList: File[]) {
			let startingSortIndex = this.files.length + 1;
			for (let i = 0; i < fileList.length; i++) {
				let f = fileList[i];
				if (this.files.some(x => x.name === f.name)) continue;
				let newFile = new ResourceImportFile(f, startingSortIndex + i);
				this.files.push(newFile);
			}
			this.step = 3;
		}

		onContinue() {
			this.step = 3;
		}

		sortOnInput(updatedFile: any) {
			updatedFile.file.sortIndex--;

			if (updatedFile.file.sortIndex < 0) {
				updatedFile.file.sortIndex = 0;
			}

			let file = this.files.find(f => f.name == updatedFile.file.name);
			let currentIndex = this.files.indexOf(file);

			this.files.splice(currentIndex, 1);
			this.files.splice(updatedFile.file.sortIndex, 0, updatedFile.file);
			this.sorted();
		}

		sorted() {
			let files = [...this.files];
			for (let i=0; i<files.length; i++) {
				files[i].sortIndex = i + 1;
			}
			this.files = files;
		}

		selectAllFiles() {
			this.$store.commit('import/SET_SELECTED_FILES', this.files);
		}

		selectNoFiles() {
			this.$store.commit('import/SET_SELECTED_FILES', []);
		}

		removeSelectedFiles() {
			const namesToRemove = this.selectedFiles.map(f => f.name);
			const namesToUpload = this.files.map(f=>f.name).filter(f => !namesToRemove.includes(f));
			const filesToUpload = this.files.filter(f=> namesToUpload.includes(f.name));
			this.files = filesToUpload;
			// If all files are removed, leaving 0 files, set step to 2
			if (this.files.length === 0) this.step = 2;
			this.selectNoFiles();
		}

		removeEnvironmentImageFile() {
			this.selectedFiles.push(this.files[0]);
			this.removeSelectedFiles();
		}

		mounted() {
			this.diskSize = '1024';
		}

		@Watch('filesAreAdded', { immediate: true })
		onFilesAreAddedChange(filesAreAdded) {
			// Ensure user are on the final step if files have been added
			if (filesAreAdded && this.step !== 3) this.step = 3;
		}
	}

</script>

<style lang="scss">

	.irf-option {
		height: 9.5rem;
		> span {
			color: darken($dark-neutral, 40%);
			display: block;
			font-size: 1.6rem;
			font-weight: bold;
			margin-bottom: 1.7rem;
		}
	}

	.if-file-buttons {
		button {
			margin-right: 0.5rem;
		}
	}

	#kvm {
		float: left;
		margin: 1.2rem 0;
	}

	.file-message {
		div {
			font-size: 1.8rem;
			margin-bottom: 1rem;
		}
	}

	.image-url-input {
		margin-bottom: 2rem;
	}
</style>