<template>
	<form
		class="file-upload-button"
		method="post"
		action="javascript:void(0)"
		enctype="multipart/form-data"
	>
		<div class="box-input">
			<input
				class="fub-input"
				type="file"
				:name="inputName"
				:id="id"
				:accept="accept"
				@change="changeFiles"
				ref="_input"
			/>
			<label :for="id">
				<ui-button
					:icon="icon"
					@click="$refs._input.click()"
					href="javascript:void(0)"
					:color-preset="secondary ? 'light-blue' : 'white'"
				>
					{{ buttonLabel }}
				</ui-button>
			</label>
		</div>
	</form>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

/**
 * A file upload form wrapping a UiButton for browsing and adding files from local
 * @example ../docs/FileUploadButton.Example.md
 */
@Component({
	name: 'FileUploadButton',
})
export default class FileUploadButton extends Vue {

	$refs!: {
		_input: HTMLFormElement
	};

	/* Props
	============================================*/

	/**
	 * String of valid file extensions
	 */
	@Prop({type: String, required: false, default: '*/*' })
	readonly accept: string;

	/**
	 * The label of the browse button
	 */
	@Prop({type: String, required: false, default: 'Browse For Files'})
	readonly buttonLabel: string;

	/**
	 * Button font icon name
	 */
	@Prop({type: String, required: false})
	readonly icon: string;

	/**
	 * The max number of files that can be added at a time
	 */
	@Prop({type: Number, required: false})
	readonly limit: number;

	/**
	 * Use secondary styles
	 */
	@Prop({type: Boolean, required: false})
	readonly secondary: boolean;

	/* Computed
	============================================*/

	get inputName() {
		if(this.limit && this.limit > 1) return 'files[]';
		return 'files';
	}

	/* Data
	============================================*/

	readonly id: string = Math.random().toString(36).substr(2, 10);

	/* Methods
	============================================*/

	/**
	 * Change handler for form input
	 */
	changeFiles(event: any) {
		if(!event) return;
		let fileList = event.target.files as FileList;
		if(!fileList || !fileList.length) return;

		// Move files from FileList to File[]
		let files: File[] = [];
		for(let i=0; i<fileList.length; i++) {
			files.push(fileList[i]);
		}

		/**
		 * Files added event, emits when user adds files
		 * @event input
		 * @type {File[]}
		 */
		this.$emit('change', files);
	}

}

</script>

<style lang="scss">
.fub-input {
	height: 0.1px;
	opacity: 0;
	overflow: hidden;
	position: absolute;
	width: 0.1px;
	z-index: -1;
}
.fub-input + label {
	color: #666666;
	cursor: pointer;
	display: inline-block;
	font-size: 1.25em;
	font-weight: normal;
	width: 100%;
}
</style>