<template>
	<div :class="['software-file-list-item flex', { selected }]">
		<div class="sfl-check">
			<checkbox v-model="selected" @input="onToggle" />
		</div>
		<div class="sfl-info flex-adapt">
			<div class="sfl-name">{{ file.name }}</div>
			<div class="sfl-fields flex">
				<div class="sfl-index">
					<text-input
						label="Order"
						:value="file.sortIndex"
						rules="numeric|required"
						@input="setSortIndex"
						@focusout="updateSortIndex"
					/>
				</div>
				<select-list
					v-model="file.physicalFormat"
					label="Physical Format"
					class="sfl-format"
					rules="required"
					@input:change="handleChange"
				>
					<option value="Q495265">ISO</option>
					<option value="Q493576">Floppy</option>
					<option value="disk">Disk</option>
					<option value="Q82753">File</option>
				</select-list>
				<text-input
					label="File Label"
					v-model="file.fileLabel"
					rules="required"
					class="sfl-label"
				/>
			</div>
		</div>
		<div class="sfl-handle flex flex-center">
			<span class="fas fa-bars"></span>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import ResourceImportFile from '@/models/import/ResourceImportFile';
import {Sync} from 'vuex-pathify';

@Component({
	name: 'ResourceFileListItem',
})
export default class ResourceFileListItem extends Vue {

	/* Props
	============================================*/
	@Prop({type: Object as () => File, required: true})
	readonly file: ResourceImportFile;

	/* Computed
	============================================*/

	@Sync('import/selectedFiles')
	selectedFiles: ResourceImportFile[];

	get selected(): boolean {
		return !!this.selectedFiles.find(f => f.name === this.file.name);
    }

    set selected(isSelected: boolean) {
		if (isSelected) {
			this.selectedFiles.push(this.file);
		}
	}

	/* Methods
	============================================*/
	updateSortIndex() {
		this.$emit('sort', { file: this.file });
	}

	setSortIndex(value: string | number) {
		this.file.sortIndex = Number(value);
	}

	onToggle(isChecked: boolean) {
		if (!isChecked) {
			this.selectedFiles = this.selectedFiles.filter(f => f.name !== this.file.name);
		}
	}

	handleChange(e: {id: string, value: string}) {
		// Only update other selected files if this file is also selected
		if (this.selected) {
			this.selectedFiles.forEach((file) => {
				file.physicalFormat = e.value;
			});
		}
	}
}

</script>

<style lang="scss">

.software-file-list-item {
	border: solid 1px lighten($light-blue, 60%);
	margin-bottom: 2rem;

	&.selected {
		outline: solid 2px $light-blue;

		.sfl-check {
			background-color: lighten($light-blue, 70%);
		}

		.sfl-info {
			background-color: lighten($light-blue, 80%);
		}

		.sfl-handle {
			border-left: solid 2px $light-blue;
		}
	}
}

.sfl-name {
	color: darken($dark-neutral, 40%);
	margin-bottom: 1.2rem;
}

.sfl-check {
	background-color: lighten($light-blue, 80%);
	flex: 0 0 2rem;
	padding: 0.5rem;
}

.sfl-info {
	background-color: #FFFFFF;
	padding: 1rem;
}

.sfl-handle {
	background-color: lighten($light-blue, 80%);
	cursor: grab;
	flex: 0 0 3rem;
	i {
		color: $light-blue;
	}
}

.sfl-fields {
	.sfl-index {
		border-right: solid 2px lighten($light-neutral, 40%);
		flex: 0 0 5rem;
		margin-right: 2rem;
		padding-right: 2rem;
	}

	.sfl-format {
		flex: 0 0 22rem;
		margin-right: 2rem;
	}

	.sfl-label {
		flex: 1 1 auto;
	}
}
</style>