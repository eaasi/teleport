<template>
	<div class="import-resource-files padded">
		<!-- No Files Added -->
		<div v-if="!filesAreAdded">
			<h3>{{ headline }}</h3>
			<div class="row">
				<div class="col-md-6">
					<div class="irf-option">
						<span class="text-center">URL</span>
						<text-input
							@change="checkUrl"
							label="File URL"
							rules="url"
							v-model="fileUrl"
							ref="urlField"
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

		<!-- Files Added, Non-Environment Import -->

		<div v-if="filesAreAdded && !isEnvImport" class="if-attached">
			<div class="flex-row justify-start mb-lg if-file-buttons" v-if="files && files.length">
				<ui-button icon="check" color-preset="light-blue" @click="selectAllFiles">
					Select All
				</ui-button>
				<ui-button
					icon="times"
					color-preset="light-blue"
					@click="selectNoFiles"
					:disabled="!selectedFiles.length"
				>
					Select None
				</ui-button>
				<ui-button
					icon="trash"
					color-preset="light-blue"
					@click="removeSelectedFiles"
					class="if-trash-file"
					:disabled="!selectedFiles.length"
				>
					Remove Selected Files
				</ui-button>
			</div>

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

		<!-- Files Added, Environment Import -->

		<div v-if="filesAreAdded && isEnvImport">
			<div class="flex-row justify-between mb-lg">
				<text-input
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

			<div class="row">
				<div class="col-md-12">
					<text-input
						label="Disk Size (MB)"
						rules="required|numeric|min:0|max:10000"
						placeholder="1024"
						value="1024"
						v-model="diskSize"
					/>
				</div>
				<div class="col-md-12">
					<select-list
						v-model="nativeFMTs"
						label="Operating System Preset"
						placeholder="Select OS Preset..."
						class="no-mb flex-adapt"
						rules="required"
					>
						<option
							v-for="os in operatingSystems"
							:key="os.id"
							:value="os.puids.map(f => f.puid)"
						>
							{{ os.id }}
						</option>
					</select-list>
				</div>
				<div class="col-md-12">
					<div id="kvm">
						<checkbox
							label="Enable KVM (Kernel-based Virtual Machine)"
							v-model="isKvmEnabled"
						/>
					</div>
				</div>
			</div>
		</div>

		<br />

		<!-- Non-Environment Import Only -->
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
	import { importTypes } from '@/utils/constants';
	import {isValidUrl} from '@/helpers/UrlHelper';
	import BaseHttpService from '@/services/BaseHttpService';
	import { Component, Watch } from 'vue-property-decorator';
	import { Sync } from 'vuex-pathify';
	// noinspection TypeScriptCheckImport
	import Draggable from 'vuedraggable';
	import ResourceFileListItem from './ResourceFileListItem.vue';
	import ResourceImportFile from '@/models/import/ResourceImportFile';
	import { ImportType } from '@/types/Import';
	import {operatingSystems} from '@/models/admin/OperatingSystems';

	let http = new BaseHttpService();

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

		@Sync('import/filesToUpload')
		files: ResourceImportFile[];

		@Sync('import/selectedFiles')
		selectedFiles: ResourceImportFile[];

		@Sync('import/importType')
		importType: ImportType;

		@Sync('import/importStep')
		step: number;

		@Sync('import/environment@urlSource')
		fileUrl: string;

		@Sync('import/environment@diskSize')
		diskSize: string;

		@Sync('import/environment@isKvmEnabled')
		isKvmEnabled: boolean;

		@Sync('import/environment@nativeFMTs')
		nativeFMTs: string[];

		/**
		 * Returns true if the string in the URL field is a valid URL
		 */
		get isUrlSource(): boolean {
			return isValidUrl(this.fileUrl);
		}

		get filesAreAdded(): boolean {
			return !!this.files.length;
		}

		get isEnvImport() {
			return this.importType === importTypes.ENVIRONMENT;
		}

		get headline() {
			if (this.isEnvImport) {
				return 'I will attach my disk image from...';
			}
			return 'I will attach files to this resource from...';
		}

		/* Data
        ============================================*/

		selectedOs: string = null;
		readonly operatingSystems = operatingSystems;

		/* Methods
        ============================================*/

		checkUrl() {
			// noinspection TypeScriptUnresolvedVariable
			this.$refs.urlField['canValidate'] = true;
			// noinspection TypeScriptUnresolvedVariable,TypeScriptUnresolvedFunction
			let validate = this.$refs.urlField['validate'];
			validate();
			this.step = this.isUrlSource ? 3 : 2;
		}

		addFiles(fileList: File[]) {
			let startingSortIndex = this.files.length + 1;
			for (let i=0; i<fileList.length; i++) {
				let f = fileList[i];
				if (this.files.some(x => x.name === f.name)) continue;
				let newFile = new ResourceImportFile(f, startingSortIndex + i);
				this.files.push(newFile);
			}
			this.step = 3;
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
			this.selectNoFiles();
		}

		@Watch('filesAreAdded', { immediate: true })
		onFilesAreAddedChange(filesAreAdded) {
			// Ensure user are on the final step if files have been added
			if (filesAreAdded && this.step !== 3) this.step = 3;
		}
	}

</script>

<style lang="scss">

	.import-resource-files {
		background-color: lighten($light-neutral, 80%);
	}

	.irf-option {
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

	.if-file-buttons {
		button {
			margin-right: 0.5rem;
		}
	}

	#kvm {
		float: left;
		margin: 1.2rem 0;
	}
</style>