<template>
	<div :class="['software-file-list-item flex', { selected }]">
		<div class="sfl-check">
			<checkbox v-model="selected" @input="onToggle" />
		</div>
		<div class="sfl-info">
			<div class="sfl-fields flex">
				<text-input
					label="File Url"
					v-model="fileUrl"
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

@Component({
	name: 'ResourceUrlItem',
})
export default class ResourceUrlItem extends Vue {

	/* Props
	============================================*/
	@Prop({type: Object as () => File, required: true})
	readonly fileUrl: string;

	/* Computed
	============================================*/

	selected: boolean = false;

	/* Methods
	============================================*/

	onToggle(isChecked: boolean) {
		this.selected = isChecked;
	}
}

</script>

<style lang="scss">

.software-file-list-item {
	border: solid 1px lighten($light-blue, 60%);
	margin-bottom: 2rem;
	width: 100%;

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
	width: 100%;
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
	.sfl-label {
		flex: 100%;
	}
}
</style>