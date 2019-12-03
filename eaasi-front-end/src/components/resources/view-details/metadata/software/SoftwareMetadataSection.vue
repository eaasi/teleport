<template>
	<div>
		<mode-toggle 
			:editable="isEditMode"
			@mode-change="onModeChange"
			@save="saveDetails"
			@reset="resetResource"
			:toggle-value="toggleValue"
			:toggle-options="toggleOptions"
		/>
		<div class="rdm-container">
			<div class="row">
				<div class="col-md-4">
					<resource-details-summary 
						:summary-data="resourceSummary" 
						:readonly="!isEditMode"
					/>
				</div>
			</div>
			<div class="row">
				<div class="col-md-4">
					<section-heading title="Software details" size="large" />
					<editable-labeled-item-list
						:readonly="!isEditMode"
						:labeled-items="objectDetailsItems"
						edit-type="text-input"
					/>
				</div>
				<div class="col-md-8">
					<section-heading title="Rendering Environments" size="large" />
					<rendering-environments :readonly="!isEditMode" />
				</div>
			</div>
			<div class="row">
				<div class="col-md-4">
					<section-heading title="Software Properties" size="large" />
					<software-properties
						:readonly="!isEditMode"
						:items="softwareProperties"
						@add-fmt="addFmt"
						@remove-fmt="removeFmt"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { IEaasiResourceSummary, ISoftwareObject } from '@/types/Resource';
import { resourceTypes } from '@/utils/constants';
import { ILabeledEditableItem } from '@/types/ILabeledItem';
import EditableLabeledItemList from '../EditableLabeledItemList.vue';
import ResourceDetailsSummary from '../ResourceDetailsSummary.vue';
import ModeToggle from '../ModeToggle.vue';
import RenderingEnvironments from './RenderingEnvironments.vue';
import SoftwareProperties from './SoftwareProperties.vue';

@Component({
    name: 'SoftwareMetadataSection',
    components: {
		SoftwareProperties,
        EditableLabeledItemList,
        ResourceDetailsSummary,
		ModeToggle,
		RenderingEnvironments
    }
})
export default class SoftwareMetadataSection extends Vue {

    /* Props
    ============================================*/
	@Prop({ type: Object as () => ISoftwareObject, required: true })
	resource: ISoftwareObject;
	
	@Prop({ type: Object })
	softwareMetadata: any;

    /* Computed
    ============================================*/
	get isEditMode(): boolean {
		return this.toggleValue === 'Edit Mode';
	}

	get resourceSummary(): IEaasiResourceSummary {
		return {
			id: this.resource.objectId,
			title: this.softwareMetadata.metadata.title,
			description: this.softwareMetadata.description,
			content: null,
			subContent: null,
			tagGroup: [],
			resourceType: resourceTypes.SOFTWARE
		};
	}

	/* Data
	============================================*/
	toggleOptions = ['Review Mode', 'Edit Mode'];
	toggleValue: string = this.toggleOptions[0];
	objectDetailsItems: ILabeledEditableItem[] = [];
	renderingEnvItems: ILabeledEditableItem[] = [];
	softwareProperties: ILabeledEditableItem[] = [];

    /* Methods
	============================================*/
	onModeChange(mode: string) {
		this.toggleValue = mode;
	}

	async saveDetails() {
		this.softwareProperties.forEach(el => this.resource[el.property] = el.value);
		const result = await this.$store.dispatch('software/saveSoftwareObject', this.resource);
		if (result && result.status === '0') this.toggleValue = this.toggleOptions[0];
	}

	resetResource() {
		this.init();
		this.$emit('reset');
	}

	init() {
		this._populateObjectDetails();
		this._populateRenderingEnv();
		this._populateSoftwareProperties();
	}

	addFmt(fmt: string) {
		let nativeFMTs = this.softwareProperties.find(i => i.property === 'nativeFMTs').value;
		this.softwareProperties = this.softwareProperties.map(
			p => p.property === 'nativeFMTs' ? {...p, value: [...nativeFMTs, fmt]} : p
		);
	}
	
	removeFmt(fmt: string) {
		let nativeFMTs = this.softwareProperties.find(i => i.property === 'nativeFMTs').value.filter(v => v !== fmt);
		this.softwareProperties = this.softwareProperties.map(
			p => p.property === 'nativeFMTs' ? {...p, value: nativeFMTs} : p
		);
	}

    /* Lifecycle Hooks
	============================================*/

	beforeMount() {
		this.init();
	}

	 /* Helpers
	============================================*/

	_populateSoftwareProperties() {
		this.softwareProperties = [
			{
				label: 'License information',
				value: this.resource.licenseInformation,
				property: 'licenseInformation',
				readonly: false,
				editType: 'text-input',
				changed: false
			},
			{
				label: 'Allowed number of instances (for unlimited choose -1)',
				value: this.resource.allowedInstances,
				property: 'allowedInstances',
				readonly: true,
				editType: 'text-input',
				changed: false
			},
			{
				label: 'QID',
				value: this.resource.qid,
				property: 'qid',
				readonly: false,
				editType: 'text-input',
				changed: false
			},
			{
				label: 'Is an operation system',
				value: this.resource.isOperatingSystem,
				property: 'isOperatingSystem',
				readonly: false,
				editType: 'checkbox',
				changed: false
			},
			{
				label: 'Rendering Capabilities: Native FMTs',
				value: this.resource.nativeFMTs,
				property: 'nativeFMTs',
				readonly: false,
				editType: 'custom',
				changed: false
			}
		];
	}

	_populateRenderingEnv() {
		this.renderingEnvItems = [
			{
				label: 'Object ID',
				value: [],
				property: 'id',
				readonly: true,
				editType: 'text-input',
				changed: false
			},
		];
	}

	_populateObjectDetails() {
		this.objectDetailsItems = [
			{
				label: 'Object ID',
				value: this.softwareMetadata.metadata.id,
				property: 'id',
				readonly: true,
				editType: 'text-input',
				changed: false
			},
			{
				label: 'Object Label',
				value: this.softwareMetadata.metadata.title,
				property: 'label',
				readonly: true,
				editType: 'text-input',
				changed: false
			},
			{
				label: 'Object is Software',
				value: this.resource.isOperatingSystem,
				property: 'isOperatingSystem',
				readonly: true,
				editType: 'checkbox',
				changed: false
			}
		];
	};

}
</script>

<style lang='scss' scoped>
	.rdm-container {
		padding: 24px;
	}
	.vds-container {

		.vds-description {
			font-size: 1.6rem;
		}

		.vds-footer {
			font-size: 0.8rem;

			.vds-label {
				text-transform: uppercase;
			}
		}
	}
</style>