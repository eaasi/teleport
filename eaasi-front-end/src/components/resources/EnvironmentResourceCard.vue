<template>
	<div>
		<selectable-card
			v-if="cardSummary"
			:bookmark="bookmark"
			footer
			:disable-select="disableSelect"
			:data="cardSummary"
			:is-loading="isSaving"
			:is-bookmark-selected="isBookmarkSelected"
			:is-clickable="isClickable"
			@bookmarked="isActive => $emit('bookmarked', isActive)"
			@change="setActiveEnvironment"
			@click:header="goToDetailsPage"
			:value="isSelected"
		>
			<template #tagsLeft>
				<tag-group position="left" :tags="resourceTypeTags" />
			</template>
			<template #tagsRight>
				<tag-group v-if="cardSummary" position="right" :tags="environmentTagGroup" />
			</template>
		</selectable-card>
	</div>
</template>

<script lang="ts">
import {ITag} from '@/types/Tag';
import Vue from 'vue';
import {Component, Prop, Watch} from 'vue-property-decorator';
import {Get, Sync} from 'vuex-pathify';
import {archiveTypes, resourceLabels, translatedIcon} from '@/utils/constants';
import {IBookmark} from '@/types/Bookmark';
import {
	IEaasiEnvironmentCardSummary,
	IEaasiResource,
	IEaasiResourceSummary,
	IEnvironment,
	ISavingEnvironmentState
} from '@/types/Resource';
import EaasiTask from '@/models/task/EaasiTask';
import {ROUTES} from '@/router/routes.const';

@Component({
	name: 'EnvironmentResourceCard',
})
export default class EnvironmentResourceCard extends Vue {

	/* Props
	============================================*/

	@Prop({type: Boolean, required: false, default: false})
	readonly bookmark: boolean;

	@Prop({type: Object as () => IEnvironment, required: true})
	readonly environment: IEnvironment;

	@Prop({type: Boolean, required: false, default: false})
	readonly disableSelect: boolean;

	@Prop({type: Boolean, required: false, default: false})
	readonly hideDetails: boolean;

	@Prop({type: Boolean, required: false, default: false})
	readonly isClickable: boolean;

	/* Data
	============================================*/

	hasNoDetails: boolean = false;
	timer: number = null;
	savedToNode: boolean = false;

	/* Computed
	============================================*/

	@Sync('resource/savingEnvironments')
	savingEnvironments: ISavingEnvironmentState[];

	@Get('bookmark/bookmarks')
	bookmarks: IBookmark[];

	@Get('resource/selectedResources')
	selectedResources: IEaasiResource[];

	@Get('task/activePollingTask')
	activePollingTask: EaasiTask;

	@Get('task/completedTasks')
	readonly completedTasks: EaasiTask[];

	get resourceTypeTags(): ITag[] {
		let text = resourceLabels.ENVIRONMENT;
		if (this.environment?.objectId) {
			text = resourceLabels.CONTENT_ENVIRONMENT;
		}
		else if (this.environment?.installedSoftwareIds?.length > 0) {
			text = resourceLabels.SOFTWARE_ENVIRONMENT;
		}

		return [{
			text,
			icon: translatedIcon('config-environment'),
			color: 'white'
		}];
	};

	get isBookmarkSelected(): Boolean {
		return this.bookmarks?.some(b => b.resourceId === this.environment.envId);
	}

	get isSaving(): Boolean {
		return this.savingEnvironments.length
			? this.savingEnvironments.some(saveState => saveState.envId === this.environment.envId)
			: false;
	}

	get completedSaveTask(): EaasiTask {
		const savingEnvState = this.savingEnvironments.find(
			saveState => saveState.envId === this.environment.envId
		);
		if (!savingEnvState) return null;
		return this.completedTasks.find(task => task.taskId == savingEnvState.taskId);
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
			drives: this.environment.drives ?? [],
			isInternetEnabled: this.environment.enableInternet,
			isPrintingEnabled: this.environment.enablePrinting,
			installedSoftware: this.environment.installedSoftwareIds ?? [],
			error: this.environment.error
		} as IEaasiEnvironmentCardSummary;
	}

	get environmentTagGroup(): ITag[] {
		let tagGroup = [];
		if (!!this.environmentCardSummary.error) {
			tagGroup = [{
				color: 'red',
				text: this.environmentCardSummary.error
			}];
		}
		if (this.savedToNode || this.environment.archive === archiveTypes.PUBLIC) {
			tagGroup.push(
				// TODO: Should we actually show both 'Public' and 'Saved Locally' icons here?
				{
					icon: translatedIcon('public-network'),
					color: 'green',
					text: 'Public'
				},
				{
					icon: translatedIcon('map-marker'),
					color: 'green',
					text: 'Saved Locally'
				}
			);
		} else if (this.environment.archive === archiveTypes.REMOTE) {
			tagGroup.push({
				icon: translatedIcon('public-network'),
				color: 'green',
				text: 'Public'
			});
		} else if (this.environment.archive === archiveTypes.DEFAULT) {
			tagGroup.push(
				{
					icon: translatedIcon('lock'),
					color: 'red',
					text: 'Private'
				}
			);
		}
		return tagGroup;
	}

	get cardSummary(): IEaasiResourceSummary {
		let summary = {
			id: this.environment.id,
			title: this.environment.title
		} as IEaasiResourceSummary;

		if (this.hideDetails) return summary;

		if (this.environment.hasOwnProperty('owner')) {
			summary.subContent = {};
		}

		summary.content = {};
		summary.content['# Drives'] = this.environmentCardSummary.drives.length;
		summary.content['emulator'] = this.environmentCardSummary.emulator;
		summary.content['Printing Enabled'] = !!this.environmentCardSummary.isPrintingEnabled;
		summary.content['Internet Enabled'] = !!this.environmentCardSummary.isInternetEnabled;

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

	@Watch('completedSaveTask')
	onTaskCompletion(cur: null | EaasiTask, prev: null | EaasiTask) {
		if (!cur) return;
		this.savedToNode = true;
		this.$store.dispatch('resource/onEnvironmentSaved', this.environment.envId);
	}

}

</script>

<style lang="scss"></style>