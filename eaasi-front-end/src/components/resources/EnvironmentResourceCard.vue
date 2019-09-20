<template>
	<selectable-card
		:data="summary"
		@change="$emit('change', $event)"
	/>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { IEaasiResourceSummary, IEnvironment } from '@/types/Resource.d.ts';

@Component({
	name: 'EnvironmentResourceCard',
})
export default class EnvironmentResourceCard extends Vue {

	/* Props
	============================================*/
	@Prop({type: Object as () => IEnvironment, required: true})
	readonly environment: IEnvironment

	/* Data
	============================================*/

	/* Computed
	============================================*/

	get summary(): IEaasiResourceSummary | null {
		if(!this.environment) return null;
		let summary = {
			id: this.environment.id,
			title: this.environment.title,
			tagGroup: [],
			content: {}
		} as IEaasiResourceSummary;

		for(let key in this.environment) {
			let val = this.environment[key];
			if(val && typeof val === 'string' && val !== 'n.a.' && val.length <= 20) {
				summary.content[key] = val;
			}
		}
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