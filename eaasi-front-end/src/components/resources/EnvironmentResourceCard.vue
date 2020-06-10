<template>
	<div>
		<selectable-card
			v-if="cardSummary"
			bookmark
			footer
			:disable-select="disableSelect"
			:data="cardSummary"
			:is-loading="isSaving"
			:is-bookmark-selected="isBookmarkSelected"
			:is-clickable="isClickable"
			@bookmarked="isActive => $emit('bookmarked', isActive)"
			@change="setActiveEnvironment"
			@click:header="goToDetailsPage"
			:is-selected="isSelected"
		>
			<template v-slot:tagsLeft>
				<tag-group position="left" :tags="resourceTypeTags" />
			</template>
			<template v-slot:tagsRight>
				<tag-group v-if="cardSummary" position="right" :tags="environmentTagGroup" />
			</template>
		</selectable-card>
	</div>
</template>

<script lang="ts">
import {ITag} from '@/types/Tag';
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import { Get, Sync } from 'vuex-pathify';
import ResourceService from '@/services/ResourceService';
import StringCleaner from '@/utils/string-cleaner';
import { resourceTypes, archiveTypes } from '@/utils/constants';
import { IBookmark } from '@/types/Bookmark';
import { IEaasiEnvironmentCardSummary, IEaasiResourceSummary, IEnvironment, IEaasiResource, ISavingEnvironmentState } from '@/types/Resource.d.ts';
import EaasiTask from '../../models/task/EaasiTask';
import { ROUTES } from '../../router/routes.const';

let resourceSvc = ResourceService;

@Component({
	name: 'EnvironmentResourceCard',
})
export default class EnvironmentResourceCard extends Vue {

	/* Props
	============================================*/

	@Prop({type: Object as () => IEnvironment, required: true})
	readonly environment: IEnvironment;

	@Prop({type: Boolean, required: false, default: false})
	readonly disableSelect: boolean;

	@Prop({type: Boolean, required: false, default: false})
	readonly isClickable: boolean;

	/* Data
	============================================*/
	hasNoDetails: boolean = false;
	timer: number = null;

	/* Computed
	============================================*/
	@Sync('resource/savingEnvironments')
	savingEnvironments: ISavingEnvironmentState[];

	@Get('bookmark/bookmarks')
	bookmarks: IBookmark[];

	@Get('resource/selectedResources')
	selectedResources: IEaasiResource[];

	@Get('task/taskQueue')
	taskQueue: EaasiTask[];

	get resourceTypeTags(): ITag[] {
		let tags = [{
			text: resourceTypes.ENVIRONMENT as string,
			icon: 'fa-cube',
			color: 'white'
		}];
		if (this.environment.hasOwnProperty('envType')) {
			if (this.environment.envType === 'base') {
				tags.push({
					icon: 'fa-box',
					color: 'white',
					text: 'Base'
				});
			}

			if (this.environment.envType === 'object') {
				tags.push({
					icon: 'fa-save',
					color: 'white',
					text: 'Object'
				});
			}
		}
		return tags;
	};

	get isBookmarkSelected(): Boolean {
		return this.bookmarks?.some(b => b.resourceID === this.environment.envId);
	}

	get isSaving(): Boolean {
		return this.savingEnvironments.length
			? this.savingEnvironments.some(saveState => saveState.envId === this.environment.envId)
			: false;
	}

	get savingEnvTask(): EaasiTask {
		if (!this.isSaving) return null;
		const savingEnvState = this.savingEnvironments.find(
			saveState => saveState.envId === this.environment.envId
		);
		return this.taskQueue.find(task => task.taskId === savingEnvState.taskId);
	}

	get isSelected(): Boolean {
		return this.selectedResources.some(r => r.envId === this.environment.envId);
	}

	get environmentCardSummary(): IEaasiEnvironmentCardSummary {
		return {
			title: this.environment.title,
			description: this.environment.description,
			archive: this.environment.archive,
			emulator: this.environment.emulator,
			drives: this.environment.drives && this.environment.drives.length ? this.environment.drives : [],
			isInternetEnabled: this.environment.enableInternet,
			isPrintingEnabled: this.environment.enablePrinting,
			installedSoftware: this.environment.installedSoftwareIds && this.environment.installedSoftwareIds.length ? this.environment.installedSoftwareIds : [],
			error: this.environment.error
		} as IEaasiEnvironmentCardSummary;
	}

	get environmentTagGroup(): ITag[] {
		let tagGroup = [];
		if (!!this.environmentCardSummary.error) {
			tagGroup = [{
				icon: 'fa-exclamation-triangle',
				color: 'red',
				text: this.environmentCardSummary.error
			}];
		}
		if (this.savingEnvTask && this.savingEnvTask.isDone) {
			tagGroup.push({
				icon: 'fa-map-marker-alt',
				color: 'green',
				text: 'Saved'
			});
		}
		if (this.environment.hasOwnProperty('archive')) {
			if (this.environment.archive === archiveTypes.REMOTE) {
				tagGroup.push({
					icon: 'fa-map-marker-alt',
					color: 'white',
					text: 'Remote'
				});
			} else if (this.environment.archive === archiveTypes.PUBLIC) {
				tagGroup.push({
					icon: 'fa-map-marker-alt',
					color: 'green',
					text: 'Saved'
				});
			} else if (this.environment.archive === archiveTypes.DEFAULT) {
				tagGroup.push({
					icon: 'fa-cloud-download-alt',
					color: 'green',
					text: 'Private'
				});
			}
		}
		return tagGroup;
	}

	get cardSummary(): IEaasiResourceSummary {
		let summary = {
			id: this.environment.id,
			title: this.environment.title,
			content: {},
			subContent: {}
		} as IEaasiResourceSummary;

		if (this.environment.hasOwnProperty('owner')) {
			summary.subContent['owner'] = this.environment.owner;
		}

		summary.content['# Drives'] = this.environmentCardSummary.drives.length;
		summary.content['Internet Enabled'] = !!this.environmentCardSummary.isInternetEnabled;
		summary.content['Printing Enabled'] = !!this.environmentCardSummary.isPrintingEnabled;
		summary.content['description'] = StringCleaner.stripHTML(this.environmentCardSummary.description);
		summary.content['Installed Software'] = this.environmentCardSummary.installedSoftware.length;
		summary.content['archive'] = this.environmentCardSummary.archive;
		summary.content['emulator'] = this.environmentCardSummary.emulator;

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

	goToDetailsPage() {
		this.$router.push({ path: ROUTES.RESOURCES.ENVIRONMENT, query: { resourceId: this.environment.envId.toString()} });
	}

	@Watch('savingEnvTask')
	onTaskCompletion(curTask: EaasiTask, prevTask: EaasiTask) {
		if(curTask && curTask.isDone) {
			this.$store.dispatch('resource/onEnvironmentSaved');
		}
	}

}

</script>

<style lang="scss"></style>