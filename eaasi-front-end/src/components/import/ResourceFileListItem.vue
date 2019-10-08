<template>
	<div :class="['software-file-list-item flex', { selected }]">
		<div class="sfl-check">
			<checkbox v-model="selected" />
		</div>
		<div class="sfl-info flex-adapt">
			<div class="sfl-name">{{ file.name }}</div>
			<div class="sfl-fields flex">
				<div class="sfl-index">
					<text-input
						label="Order"
						:value="file.sortIndex"
						rules="numeric|required"
						@input="updateSortIndex"
					/>
				</div>
				<select-list
					v-model="file.physicalFormat"
					label="Physical Format"
					class="sfl-format"
				>
					<!-- TODO: confirm these options -->
					<option value="Floppy Disk">Floppy Disk</option>
					<option value="CD-ROM">CD-ROM</option>
					<option value="Disk">Disk</option>
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
			<i class="fas fa-bars"></i>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import ResourceImportFile from '@/models/import/ResourceImportFile';

@Component({
	name: 'SoftwareFileListItem',
})
export default class SoftwareFileListItem extends Vue {

	/* Props
	============================================*/

	@Prop({type: Object as () => File, required: true})
	readonly file: ResourceImportFile

	/* Data
	============================================*/

	selected: boolean = false;

	/* Methods
	============================================*/

	updateSortIndex(sortIndex: string | number) {
		let i = Number(sortIndex);
		this.$emit('sort', i);
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