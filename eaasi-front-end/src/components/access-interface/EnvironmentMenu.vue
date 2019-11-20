<template>
	<div class="environment-menu">
		<div class="em-header">
			<div class="em-tags">
				<tag text="Environment" icon="fa-box" />
				<tag v-if="environment.isImport" text="New Import" icon="fa-upload" color="yellow" />
			</div>
			<h2>{{ environment.title }}</h2>
			<p v-if="environment.isImport"></p>
			<p v-else-if="environment.description">{{ environment.description | stripHtml }}</p>
			<p v-else>No description for this environment was provided.</p>
		</div>

		<tabbed-nav
			v-if="!environment.isImport"
			:tabs="tabs"
			v-model="tab"
		/>

		<div v-if="tab === 'New Import'" class="em-configure">
			<h3 class="divider-header">New Environment Import</h3>
			<collapsable
				title="Describe the new Environment Import"
				secondary
				class="white-bg"
			>
				<eaasi-form>
					<text-area-input
						label="New Environment Description"
						rules="required"
						v-model="newImportDescription"
					/>
					<ui-button block @click="saveImport">Save Environment Import</ui-button>
				</eaasi-form>
			</collapsable>
		</div>

		<div v-if="tab === 'Configure New'" class="em-configure">
			<h3 class="divider-header">New Configuration</h3>
			<p class="mb">Document changes you make to the environment</p>
			<collapsable
				title="Did you change OS settings?"
				open-title="I made these changes to OS settings..."
				color-preset="light-blue"
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
				color-preset="light-blue"
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
				color-preset="light-blue"
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
import eventBus from '@/utils/event-bus';
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { IEaasiTab } from 'eaasi-nav';
import { IEnvironment } from '@/types/Resource';
import { Get } from 'vuex-pathify';

@Component({
	name: 'EnvironmentMenu',
	components: {
	}
})
export default class EnvironmentMenu extends Vue {
	/* Data
	============================================*/
	newImportDescription: string;  // TODO: this will become an object when more metadata is available

	/* Computed
	============================================*/
	@Get('resource/activeEnvironment')
	readonly environment: IEnvironment;

	get tabs(): IEaasiTab[] {
		if (this.environment.isImport) {
			return [];
		}
		return [
			{ label: 'Saved Metadata' },
			{ label: 'Configure New' }
		];
	}

	get tab(): string {
		if (this.environment.isImport) {
			return 'New Import';
		}
		return 'Configure New';
	};

	/**
	 * Computes whether or not to show the details tab
	 */
	get hasDetails() {
		// TODO: Logic for showing details tab
		return true;
	}

	/* Methods
	============================================*/
	/**
	 * Emits an event to save an imported environment
	 */
	saveImport() {
		eventBus.$emit('emulator:saveEnvironmentImport', this.newImportDescription);
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