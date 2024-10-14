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
					@change="handleChange"
					@sameValueChange="handleChange"
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
import {PhysicalFormat} from '@/types/Resource';
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

	handleChange(fieldValue: string) {
		// Only update other selected files if this file is also selected
		let format = fieldValue as PhysicalFormat;
		if (this.selected) {
			this.selectedFiles.forEach((file) => {
				file.physicalFormat = format;
			});
		}
	}
}

</script>

<style lang="scss">

.software-file-list-item {
	border: solid 2px black;
	margin-bottom: 2rem;

	&.selected {
		outline: solid 1px $black;

		.sfl-check {
			background-color: $green;
		}

		.sfl-info {
			background-color: $light-green-background;
		}
	}
}

.sfl-name {
	color: $dark-light-grey;
	margin-bottom: 1.2rem;
}

.sfl-check {
	background-color: $green-background;
	flex: 0 0 2rem;
	padding: 0.5rem;
}

.sfl-info {
	background-color: #FFFFFF;
	padding: 1rem;
}

.sfl-handle {
	background-color: $green-background;
	cursor: grab;
	flex: 0 0 3rem;
	i {
		color: $green;
	}
}

.sfl-fields {
	.sfl-index {
		border-right: solid 2px black;
		flex: 0 0 5rem;
		margin-right: 2rem;
		padding-right: 2rem;
		text-align: center;
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