<template>
	<div
		:class="['file-dropzone flex flex-center', { active: dragover }]"
		@drop.prevent="addFile"
		@dragover.prevent="dragover = true"
		@dragleave="dragover = false"
	>
		<div class="dfu-icon" @dragenter="dragover = true">
			<span class="fas fa-upload"></span>
			<div class="dfu-content">
				{{ label }}
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

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
		if(this.limit === 1) return 'Drag File Here To Upload';
		return 'Drag Files Here To Upload';
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