<template>
	<div
		:class="['file-dropzone flex flex-center', { active: dragover }]"
		@drop.prevent="addFile"
		@dragover.prevent="dragover = true"
		@dragleave="dragover = false"
	>
		<div class="dfu-icon" @dragenter="dragover = true">
			<i class="fas fa-upload"></i>
			<div ckass="dfu-content">
				Drag Files Here To Upload
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

/**
 * A drag-and-drop file upload area
 * @example ../docs/FileDropzone.Example.md
 */
@Component({
	name: 'FileDropzone',
})
export default class FileDropzone extends Vue {

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
			this.files.push(fileList[i]);
		}
		this.$emit('change', this.files);
	}

}

</script>

<style lang="scss">
.file-dropzone {
	border: dashed 2px lighten($light-blue, 60%);
	min-height: 15rem;
	min-width: 20rem;
	transition: background-color 0.3s;

	&.active {
		background-color: lighten($light-blue, 90%);
	}
}

.dfu-icon {
	position: relative;
	i {
		color: lighten($light-blue, 80%);
		font-size: 8rem;
	}
	div {
		color: $dark-blue;
		font-weight: bold;
		left: -5rem;
		position: absolute;
		top: 3rem;
		width: 20rem;
	}
}
</style>