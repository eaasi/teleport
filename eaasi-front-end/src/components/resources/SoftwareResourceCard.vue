<template>
	<selectable-card
		:data="summary"
		@change="$emit('change', $event)"
	/>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { IEaasiResourceSummary, ISoftwarePackage } from '@/types/Resource.d.ts';

@Component({
	name: 'Software',
})
export default class Software extends Vue {

	/* Props
	============================================*/
	@Prop({type: Object as () => ISoftwarePackage, required: true})
	readonly software: ISoftwarePackage

	/* Data
	============================================*/

	/* Computed
	============================================*/

	get summary(): IEaasiResourceSummary | null {
		if(!this.software) return null;
		let summary = {
			id: this.software.id,
			title: this.software.label,
			tagGroup: [],
			content: {
				'id': this.software.id,
				'Is Operating System': this.software.isOperatingSystem
			}
		} as IEaasiResourceSummary;
		return summary;
	}

	/* Methods
	============================================*/

	/* Lifecycle Hooks
	============================================*/

	/* Watchers
	============================================*/

}

</script>

<style lang="scss"></style>