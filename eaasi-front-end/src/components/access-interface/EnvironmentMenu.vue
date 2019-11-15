<template>
	<div class="environment-menu">
		<div class="em-header">
			<div class="em-tags">
				<tag text="Environment" icon="fa-box" />
			</div>
			<h2>{{ environment.title }}</h2>
			<p v-if="environment.description">{{ environment.description | stripHtml }}</p>
			<p v-else>No description for this environment was provided.</p>
		</div>
		<tabbed-nav
			:tabs="tabs"
			v-model="tab"
		/>

		<div v-if="tab === 'Configure New'" class="em-configure">
			<h3 class="divider-header">New Configuration</h3>
			<p class="mb">Document changes you make to the environment</p>
			<collapsable
				title="Did you change OS settings?"
				open-title="I made these changes to OS settings..."
				secondary
				:collapsed="true"
				class="white-bg"
			>
				<eaasi-form>
					<text-input label="Applied Change" rules="required" />
					<text-area-input label="Applied Change Details" rules="required" />
					<ui-button block>Add To Environment Metadata</ui-button>
				</eaasi-form>
			</collapsable>
			<collapsable
				title="Did you install new software?"
				open-title="I installed the following software.."
				secondary
				:collapsed="true"
				class="white-bg"
			>
				<eaasi-form>
					<text-input label="Applied Change" rules="required" />
					<text-area-input label="Applied Change Details" rules="required" />
					<ui-button block>Add To Environment Metadata</ui-button>
				</eaasi-form>
			</collapsable>

			<collapsable
				title="Did you make software changes?"
				open-title="I made these software changes.."
				secondary
				:collapsed="true"
				class="white-bg"
			>
				<eaasi-form>
					<text-input label="Applied Change" rules="required" />
					<text-area-input label="Applied Change Details" rules="required" />
					<ui-button block>Add To Environment Metadata</ui-button>
				</eaasi-form>
			</collapsable>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { IAction, IEaasiTab } from 'eaasi-nav';
import { IEnvironment } from '@/types/Resource';

@Component({
	name: 'EnvironmentMenu',
	components: {
	}
})
export default class EnvironmentMenu extends Vue {

	/* Props
	============================================*/

	@Prop({type: Object as () => IEnvironment, required: true})
	readonly environment: IEnvironment

	/* Data
	============================================*/

	tabs: IEaasiTab[] = [
		{
			label: 'Saved Metadata'
		},
		{
			label: 'Configure New'
		}
	];

	tab: string = 'Configure New';

	/* Computed
	============================================*/

	/**
	 * Computes whether or not to show the details tab
	 */
	get hasDetails() {
		// TODO: Logic for showing details tab
		return true;
	}

	/* Methods
	============================================*/

	doAction(action: IAction) {
		console.log(`Action clicked: ${action.label}`);
		if(action.label === 'Run in Emulator') {
			if(this.environment) {
				this.$router.push(`/access-interface/${this.environment.envId}`);
			}
		}
	}

}

</script>

<style lang="scss">
.environment-menu {
	background-color: lighten($light-neutral, 60%);
	height: calc(100vh - #{$accessHeaderHeight});
	margin-top: $accessHeaderHeight;
	overflow-y: scroll;
	width: $accessMenuWidth;
	.fa-times {
		cursor: pointer;
	}
}

.em-header {
	background-color: #FFFFFF;
	border-bottom: solid 4px lighten($dark-neutral, 70%);
	padding: 2rem;

	p {
		color: $dark-neutral;
		font-size: 1.4rem;
	}

	.em-tags {
		margin-bottom: 1.4rem;
	}
}

.em-configure {
	padding: 2rem;

	.collapsable {
		margin-bottom: 2rem;
	}
}
</style>