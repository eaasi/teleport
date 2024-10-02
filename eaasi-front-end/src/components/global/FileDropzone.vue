<template>
	<div
		:class="['file-dropzone flex flex-center flex-column', { active: dragover }]"
		@drop.prevent="addFile"
		@dragover.prevent="dragover = true"
		@dragleave="dragover = false"
	>
		<div class="dfu-label flex flex-column flex-center relative" @dragenter="dragover = true">
			<div class="dfu-content text-center">
				{{ label }}
			</div>
		</div>
		<div style="margin-top: 1rem;">
			<slot></slot>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import {translatedIcon} from '@/utils/constants';

/**
 * A drag-and-drop file upload area
 * @example ../docs/FileDropZone.Example.md
 */
@Component({
	name: 'FileDropzone',
})
export default class FileDropzone extends Vue {

	/* Props
	============================================*/

	/**
	 * The max number of files that can be added at a time
	 */
	@Prop({type: Number, required: false})
	readonly limit: number;

	/* Computed
	============================================*/

	get label() {
		return 'Drag File Here To Upload';
	}

	get uploadIcon() {
		return translatedIcon('cloud-upload');
	}

	/* Data
	============================================*/

	/**
	 * Whether or not a file is being dragged over the area
	 */
	dragover: boolean = false;

	/**
	 * A list of files that have been dropped in the uploader
	 */
	files: File[] = [];

	/* Methods
	============================================*/

	/**
	 * Called when a file is dropped in the dropzone
	 */
	addFile(e: DragEvent) {
		let fileList = e.dataTransfer.files as FileList;
		if(!fileList || !fileList.length) return;
		for(let i=0; i<fileList.length; i++) {
			if( this.limit && (i+1) > this.limit) continue;
			this.files.push(fileList[i]);
		}
		this.$emit('change', this.files);
	}

}

</script>

<style lang="scss">
.file-dropzone {
	border: dashed 2px $green;
	min-height: 16rem;
	min-width: 20rem;
	background-color: $light-grey;
	transition: background-color 0.3s;

	&.active {
		background-color: lighten($light-blue, 90%);
	}

	.eaasi-upload-icon {
		font-family: EaasiIcon, fantasy;
	}
}

.dfu-label {
	min-width: 20rem;
	.fas {
		color: lighten($light-blue, 80%);
		font-size: 8rem;
	}
	div {
		color:black;
		font-weight: bold;
		left: 0;
		right: 0;
	}
}
</style>