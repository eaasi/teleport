<template>
	<div :class="['software-file-list-item flex', { selected }]">
		<div class="sfl-info flex-adapt">
			<div class="sfl-fields flex">
				<text-input
					label="File Label"
					v-model="file.fileLabel"
					rules="required"
					class="sfl-label"
				/>
			</div>
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