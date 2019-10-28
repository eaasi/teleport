<template>
	<selectable-card
		v-if="cardSummary"
		:bookmark="true"
		:data="cardSummary"
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
    import {IEaasiEnvironmentCardSummary, IEaasiResourceSummary, IEnvironment} from '@/types/Resource.d.ts';
    import {ITag} from '@/types/Tag';
    import {resourceTypes} from '@/utils/constants';
	import StringCleaner from '@/utils/string-cleaner';
    import Vue from 'vue';
    import {Component, Prop} from 'vue-property-decorator';

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
		cardSummary: IEaasiResourceSummary = null;

		/* Computed
        ============================================*/

		get environmentResourceType() {
			return resourceTypes.ENVIRONMENT;
		}

		get envTags(): ITag[] {
			if (!this.cardSummary) return [];
			return this.cardSummary.tagGroup;
		}

		/* Methods
        ============================================*/
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

		setCardSummary() {
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
				if (val && typeof val === 'string' && val !== 'n.a.' && val.length <= 20) {
					summary.subContent[key] = val;
					if (key.toLowerCase() === 'archive') {
						if (summary.subContent[key].toLowerCase() === 'public') {
							summary.tagGroup.push({
								icon: 'fa-map-marker-alt',
								color: 'green',
								text: 'Saved'
							});
						}
					}
				}
			}

			for (let key in this.environmentCardSummary) {
				console.log(key)
				if (key.toLowerCase() === 'drives') {
					let driveCountName = '# Drives';
					summary.content[driveCountName] = this.environmentCardSummary[key].length;
				} else if (key.toLowerCase() === 'archive') {
					continue;
				} else if (key.toLowerCase() === 'isinternetenabled') {
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

			if (this.hasNoDetails) {
				summary.tagGroup.push({
					icon: 'fa-exclamation-triangle',
					color: 'red',
					text: 'Error Retrieving Details'
				});
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
			this.isLoading = true;
			this.getEnvironmentDetails().then(async () => {
				await this.setCardSummary();
				this.isLoading = false;
			});
		}

	/* Watchers
        ============================================*/

}

</script>

<style lang="scss"></style>