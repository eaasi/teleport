<template>
	<selectable-card
		:bookmark="true"
		:data="summary"
		:footer="true"
		:is-loading="isLoading"
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
import ResourceService from '@/services/ResourceService';
import { ITag } from '@/types/Tag';
import { resourceTypes } from '@/utils/constants';
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import {IEaasiEnvironmentCardSummary, IEaasiResourceSummary, IEnvironment} from '@/types/Resource.d.ts';

let resourceSvc = ResourceService;

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
	environmentCardSummary?: IEaasiEnvironmentCardSummary;
	isLoading: boolean = false;
	hasNoDetails: boolean = false;

	/* Computed
	============================================*/

	get environmentResourceType() {
		return resourceTypes.ENVIRONMENT.toUpperCase();
	}

	get envTags(): ITag[] {
		if (!this.summary) return [];
		return this.summary.tagGroup;
	}

	get summary(): IEaasiResourceSummary | null {
		if (!this.environment) return null;

		resourceSvc.getEnvironment(this.environment.envId).then(res => {
			if (res.error) {
				this.hasNoDetails = true;
				this.environmentCardSummary = {
					hasError: true
				};
			} else {
				this.environmentCardSummary = {
					title: res.title,
					description: res.description,
					archive: res.archive,
					drives: res.drives,
					emulator: res.emulator,
					isInternetEnabled: res.enableInternet,
					isPrintingEnabled: res.enablePrinting,
					installedSoftware: res.installedSoftwareIds,
				};
			}
		});

		let summary = {
			id: this.environment.id,
			title: this.environment.title,
			tagGroup: [],
			content: {},
			subContent: {}
		} as IEaasiResourceSummary;

		// TODO: Refactor
		for (let key in this.environment) {
			if (key.toLowerCase() === 'archive' || key.toLowerCase() === 'resourcetype') continue;

			let val = this.environment[key];

			if (val && typeof val === 'string' && val !== 'n.a.' && val.length <= 20) {

				summary.content[key] = val;
				summary.subContent[key] = val;

				if (key.toLowerCase() === 'archive') {
					if (summary.content[key].toLowerCase() === 'public') {
						summary.tagGroup.push({
							icon: 'fa-map-marker-alt',
							color: 'green',
							text: 'SAVED'
						});
					}
				}
			}
		}

		if (this.hasNoDetails) {
			summary.tagGroup.push({
				icon: 'fa-exclamation-triangle',
				color: 'red',
				text: 'Error'
			});
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
	created() {
	}

	/* Watchers
	============================================*/

}

</script>

<style lang="scss"></style>