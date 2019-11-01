<template>
	<div>
		<selectable-card
			v-if="cardSummary"
			bookmark
			:data="cardSummary"
			footer
			:is-loading="isSaving"
			:is-bookmark-selected="isBookmarkSelected"
			@bookmarked="isActive => $emit('bookmarked', isActive)"
			@change="setActiveEnvironment"
		>
			<template v-slot:tagsLeft>
				<tag :text="environmentResourceType" icon="fa-box" color="blue" />
			</template>
			<template v-slot:tagsRight>
				<tag-group v-if="cardSummary" position="right" :tags="cardSummary.tagGroup" />
			</template>
		</selectable-card>
	</div>
</template>

<script lang="ts">
    import ResourceService from '@/services/ResourceService';
	import {
		IEaasiEnvironmentCardSummary,
		IEaasiResourceSummary,
		IEnvironment
	} from '@/types/Resource.d.ts';
	import { ITaskState } from '@/types/Task';
    import { resourceTypes } from '@/utils/constants';
	import StringCleaner from '@/utils/string-cleaner';
    import Vue from 'vue';
    import { Component, Prop } from 'vue-property-decorator';
	import { Get, Sync } from 'vuex-pathify';
	import { IBookmark } from '../../types/Bookmark';

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
		hasNoDetails: boolean = false;
		cardSummary: IEaasiResourceSummary = null;
		timer: number = null;

		/* Computed
	============================================*/
		@Sync('resource/savingEnvironments')
		savingEnvironments: string[];

		@Sync('resource/saveEnvironmentTaskMap')
		saveEnvironmentTaskMap: string[];

		@Get('bookmark/bookmarks')
		bookmarks: IBookmark[];

		get isBookmarkSelected(): Boolean {
			return this.bookmarks.some(b => b.resourceID === this.environment.envId);
		}

		get isSaving() {
			if (this.savingEnvironments.length) {
				let result = this.savingEnvironments.includes(this.environment.envId);
				if (result) {
					this.pollForEnvironmentTaskStatus();
					return true;
				}
			}
			return false;
		}

		get environmentResourceType() {
			return resourceTypes.ENVIRONMENT;
		}

		/* Methods
        ============================================*/

		/**
		 * Polls for an Environment Task to be complete at the rate specified by
		 * the task's polling interval.  If a task is complete, we remove it from the
		 * list of saving environments.  If there is an error, we update the Resource Card
		 * to display an error message.
		 */
		async pollForEnvironmentTaskStatus() {
			let self = this;
			if (self.timer) clearInterval(self.timer);
			let task = this.saveEnvironmentTaskMap[this.environment.envId];

			self.timer = setInterval(async () => {
				let taskState = await self.$store.dispatch('getEnvironmentTaskState', task.taskId) as ITaskState;

				if (!taskState || taskState.isDone) {
					await self.$store.dispatch('resource/onEnvironmentSaved', this.environment.envId)
						.then(() => {
							this.cardSummary.tagGroup.push({
								icon: 'fa-map-marker-alt',
								color: 'green',
								text: 'Saved'
							});
						});
				}
			}, task.pollingInterval);
		}

		async getEnvironmentDetails() {
			await resourceSvc.getEnvironment(this.environment.envId).then(res => {
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
		}

		/**
		 * Sets the display data in the EnvironmentResourceCard
		 */
		setCardSummary() {
			// TODO: Refactor this method

			if (!this.environment) return null;

			let summary = {
				id: this.environment.id,
				title: this.environment.title,
				tagGroup: [],
				content: {},
				subContent: {}
			} as IEaasiResourceSummary;

			for (let key in this.environment) {
				let val = this.environment[key];

				if (key.toLowerCase() === 'archive') {
					if (this.environment[key].toLowerCase() === 'public') {
						summary.tagGroup.push({
							icon: 'fa-map-marker-alt',
							color: 'green',
							text: 'Saved'
						});
					}
				}

				if (key.toLowerCase() === 'owner') {
					summary.subContent[key] = val;
				}
			}

			for (let key in this.environmentCardSummary) {
				if (key.toLowerCase() === 'haserror') {
					summary.tagGroup.push({
						icon: 'fa-exclamation-triangle',
						color: 'red',
						text: 'Error Retrieving Details'
					});
					continue;
				}
				if (key.toLowerCase() === 'drives') {
					let driveCountName = '# Drives';
					summary.content[driveCountName] = this.environmentCardSummary[key].length;
				}
				else if (key.toLowerCase() === 'archive' || key.toLowerCase() === 'title') {
					// Do not add redundant data to summary
				}
				else if (key.toLowerCase() === 'isinternetenabled') {
					let internetEnabled = 'Internet Enabled';
					summary.content[internetEnabled] = this.environmentCardSummary[key];
				} else if (key.toLowerCase() === 'isprintingenabled') {
					let printingEnabled = 'Printing Enabled';
					summary.content[printingEnabled] = this.environmentCardSummary[key];
				} else if (key.toLowerCase() === 'description') {
					summary.content[key] = StringCleaner.stripHTML(this.environmentCardSummary[key]);
				} else if (key.toLowerCase() === 'installedsoftware') {
					if (!this.environmentCardSummary[key].length) continue;
					let installedSoftware = 'Installed Software';
					summary.content[installedSoftware] = this.environmentCardSummary[key].length;
				} else {
					summary.content[key] = this.environmentCardSummary[key];
				}
			}
			this.cardSummary = summary;
		}

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
		async created() {
			this.getEnvironmentDetails().then(async () => {
				await this.setCardSummary();
			});
		}

	/* Watchers
        ============================================*/

}

</script>

<style lang="scss"></style>