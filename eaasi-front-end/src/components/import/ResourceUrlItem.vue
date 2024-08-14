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
	border: solid 2px black;
	margin-bottom: 2rem;
	width: 100%;

	&.selected {
		outline: solid 1px black;

		.sfl-check {
			background-color: $green;
		}

		.sfl-info {
			background-color: $green-background;
		}

		.sfl-handle {
			background-color: $green;
		}
	}
}

.sfl-name {
	color: darken($dark-neutral, 40%);
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
	width: 100%;
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
	.sfl-label {
		flex: 100%;
	}
}
</style>