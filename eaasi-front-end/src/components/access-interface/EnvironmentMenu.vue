<template>
	<div class="environment-menu">
		<div class="em-header">
			<div class="em-tags">
				<tag
					v-if="environment && environment.isImport"
					text="New Import"
					:icon="uploadIcon"
					color="yellow"
				/>

				<tag
					v-else-if="isConstructed"
					text="Content Environment"
					:icon="saveIcon"
					color="blue"
				/>

				<tag
					v-else
					text="Base Environment"
					:icon="configEnvironmentIcon"
				/>
			</div>
			<h2 v-if="environment && environment.isImport">{{ importTitle }}</h2>
			<h2 v-else-if="environment">{{ environment.title }}</h2>
			<h2 v-else-if="createEnvironmentPayload">{{ createEnvironmentPayload.label }}</h2>
			<p v-if="environment && environment.isImport"></p>
			<p v-else-if="environment && environment.description">{{ environment.description | stripHtml }}</p>
			<p v-else>No description for this environment was provided.</p>
		</div>

		<tabbed-nav
			v-if="!environment || !environment.isImport"
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

		<!--Removed due to https://gitlab.com/eaasi/eaasi-client-dev/-/issues/660 -->
		<!--<div v-if="tab === 'Configure New'" class="em-configure">
			<h3 class="divider-header">New Configuration</h3>
			<p class="mb">Document changes you make to the environment</p>
			<collapsable
				title="Did you change OS settings?"
				open-title="I made these changes to OS settings..."
				color-preset="white"
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
				color-preset="white"
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
				color-preset="white"
				:collapsed="true"
				class="white-bg"
			>
				<eaasi-form>
					<text-input label="Applied Change" rules="required" />
					<text-area-input label="Applied Change Details" rules="required" />
					<ui-button block>Add To Environment Metadata</ui-button>
				</eaasi-form>
			</collapsable>
		</div>-->
	</div>
</template>

<script lang="ts">
import eventBus from '@/utils/event-bus';
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { IEaasiTab } from 'eaasi-nav';
import { IEnvironment } from '@/types/Resource';
import { Get } from 'vuex-pathify';
import { translatedIcon } from '@/utils/constants';
import { ICreateEnvironmentPayload } from '@/types/Import';

@Component({
	name: 'EnvironmentMenu',
	components: {
	}
})
export default class EnvironmentMenu extends Vue {
	/* Data
	============================================*/
	newImportDescription: string = '';  // TODO: this will become an object when more metadata is available

	/* Computed
	============================================*/
	@Get('resource/activeEnvironment')
	readonly environment: IEnvironment;

	@Get('resource/activeEphemeralEnvironment')
	createEnvironmentPayload: ICreateEnvironmentPayload;

	@Get('import/environment@title')
	readonly importTitle: string;

	@Get('import/isConstructedEnvironment')
	readonly isConstructed: boolean;

	get tabs(): IEaasiTab[] {
		if (!this.environment || this.environment.isImport) {
			return [];
		}
		return [
			{ label: 'Saved Metadata' },
			/*{ label: 'Configure New' }*/
		];
	}

	get configEnvironmentIcon(): string {
		return translatedIcon('config-environment');
	}

	get saveIcon(): string {
		return translatedIcon('fa-save');
	}

	get uploadIcon(): string {
		return translatedIcon('upload');
	}

	tab: string = 'Saved Metadata';

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
		eventBus.$emit('emulator:saveEnvironmentImport', {
			description: this.newImportDescription,
			title: this.environment ? this.environment.title : this.createEnvironmentPayload.label,
		});
	}

	mounted() {
		if (this.environment && this.environment.isImport) {
			this.tab = 'New Import';
		}
	}
}

</script>

<style lang="scss">
.environment-menu {
	background-color: #e3e3e3;
	height: calc(100vh - #{$accessHeaderHeight});
	margin-top: $accessHeaderHeight;
	overflow-y: scroll;
	width: 25%;

	@include tablet {
		padding-top: 45px;
		width: $accessMenuWidth;
	}

	.fa-times {
		cursor: pointer;
	}

	.eaasi-tabs li {
		max-width: unset;
	}
}

.em-header {
	background-color: #FFFFFF;
	padding: 2rem;

	p {
		color: $dark-light-grey;
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