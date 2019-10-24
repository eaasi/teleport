<template>
	<selectable-card
		:bookmark="true"
		:data="summary"
		:footer="true"
		@change="setActiveEnvironment"
	>
		<template v-slot:tagsLeft>
			<tag :text="environmentResourceType" icon="fa-box" color="blue" />
		</template>
		<template v-slot:tagsRight>
			<tag-group v-if="summary" position="right" :tags="envTags" />
		</template>
	</selectable-card>
</template>

<script lang="ts">
import { ITag } from '@/types/Tag';
import { resourceTypes } from '@/utils/constants';
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

	get environmentResourceType() {
		return resourceTypes.ENVIRONMENT.toUpperCase();
	}

	get envTags(): ITag[] {
		if (!this.summary) return [];
		return this.summary.tagGroup.map(t => ({
			icon: 'fa-map-marker-alt',
			color: 'green',
			text: t.value
		}));
	}

	get summary(): IEaasiResourceSummary | null {
		if (!this.environment) return null;

		let summary = {
			id: this.environment.id,
			title: this.environment.title,
			tagGroup: [],
			content: {},
			subContent: {}
		} as IEaasiResourceSummary;

		// TODO: Refactor
		for (let key in this.environment) {
			let val = this.environment[key];

			if (val && typeof val === 'string' && val !== 'n.a.' && val.length <= 20) {
				summary.content[key] = val;
				summary.subContent[key] = val;

				if (key.toLowerCase() === 'archive') {
					if (summary.content[key].toLowerCase() === 'public') {
						summary.tagGroup.push({
							icon: 'eye',
							key: '',
							value: 'SAVED'
						});
					}
				}
			}
		}
		return summary;
	}

	/* Methods
	============================================*/

	setActiveEnvironment(isChecked) {
		if (isChecked) {
			this.$store.commit('resource/SET_ACTIVE_ENVIRONMENT', this.environment);
		} else {
			this.$store.commit('resource/SET_ACTIVE_ENVIRONMENT', null);
		}
		this.$emit('change', isChecked);
	}

	/* Lifecycle Hooks
	============================================*/

	/* Watchers
	============================================*/

}

</script>

<style lang="scss"></style>