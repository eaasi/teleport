<template>
	<div class="rdm-container">
		<div class="row">
			<div class="col-md-4">
				<resource-details-summary 
					:summary-data="resourceSummary" 
					:readonly="readonly"
				/>
			</div>
		</div>
		<div class="row">
			<div class="col-md-4">
				<section-heading title="General" size="large" />
				<editable-labeled-item-list
					:readonly="readonly"
					:labeled-items="generalItems"
					edit-type="text-input"
				/>
			</div>
			<div class="col-md-4">
				<section-heading title="System Requirements" size="large" />
				<editable-labeled-item-list
					:readonly="readonly"
					:labeled-items="sysReqItems"
					edit-type="text-input"
				/>
			</div>
			<div class="col-md-4">
				<section-heading title="Hardware & Peripherals" size="large" />
				<editable-labeled-item-list
					:readonly="readonly"
					:labeled-items="hardwareAndPeripheralsItems"
					edit-type="text-input"
				/>
			</div>
		</div>

		<div class="row">
			<div class="col-md-4">
				<section-heading title="Hard Drive & Memory" size="large" />
				<editable-labeled-item-list
					:readonly="readonly"
					:labeled-items="hardDriveAndMemory"
					edit-type="text-input"
				/>
			</div>
			<div class="col-md-4">
				<section-heading title="Network" size="large" />
				<editable-labeled-item-list
					:readonly="readonly"
					:labeled-items="networkItems"
					edit-type="checkbox"
				/>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import { IEaasiResourceSummary, IEnvironment, IEaasiResource } from '@/types/Resource';
import { resourceTypes } from '@/utils/constants';
import { ILabeledItem } from '@/types/ILabeledItem';
import EditableLabeledItemList from './EditableLabeledItemList.vue';
import ResourceDetailsSummary from '@/components/resources/view-details/metadata/ResourceDetailsSummary.vue';
import ConfiguredDrives from './ConfiguredDrives.vue';

@Component({
    name: 'EnvironmentMetadataSection',
    components: {
        EditableLabeledItemList,
        ResourceDetailsSummary,
        ConfiguredDrives
    }
})
export default class EnvironmentMetadataSection extends Vue {

    /* Props
    ============================================*/
	@Prop({ type: Object as () => IEnvironment, required: true })
    resource: IEnvironment;

    @Prop({ type: Boolean })
    readonly: Boolean;
    
    /* Computed
	============================================*/
	
	get resourceSummary() {
		return {
			id: this.resource.id,
			// @ts-ignore
			title: this.resource.label,
			tagGroup: [],
			content: {},
			subContent: {}
		} as IEaasiResourceSummary;
	}

	get hardwareAndPeripheralsItems() : ILabeledItem[] {
		return [
			// @ts-ignore
            { label: 'Required Pointer Device Type', value: '' },
            { label: 'Required Storage Device Type', value: '' },
            { label: 'Required Audio device', value: '' },
            { label: 'Required GPU Device', value: '' },
        ];
	}
	
	get hardDriveAndMemory() : ILabeledItem[] {
		return [
			// @ts-ignore
            { label: 'Required Pointer Device Type', value: '' },
            { label: 'Required Storage Device Type', value: '' },
            { label: 'Required Audio device', value: '' },
            { label: 'Required GPU Device', value: '' },
        ];
    }

	get generalItems() : ILabeledItem[] {
		return [
			// @ts-ignore
            { label: 'Software Name', value: this.resource.label },
            { label: 'Version', value: '' },
            { label: 'Local Identifier', value: '' },
			{ label: 'Local Identifier Source', value: '' },
			{ label: 'Minimum Ram', value: '' },
			{ label: 'Minimum Disk Space', value: '' },
			{ label: 'Display Color Depth', value: '' },
			{ label: 'Display Resolution', value: '' },
        ];
    }

    get sysReqItems(): ILabeledItem[] {
        return [
			{ label: 'Requirements summary', value: '' },
            { label: 'Required Software', value: '' },
            { label: 'Required Operating System', value: '' },
			{ label: 'Required Machine Type', value: '' },
			{ label: 'Required Architecture', value: '' },
        ];
	}
	
	get networkItems(): ILabeledItem[] {
		return [
			{ label: 'Internet Access Required', value: false }
		];
	}

    /* Data
    ============================================*/

    /* Methods
    ============================================*/
    
    _createFileSystemLabel(fileSystem: string): string {
		if (!fileSystem) fileSystem = 'Not specified';
		return `File System: ${fileSystem}`;
	}

    /* Lifecycle Hooks
    ============================================*/

}
</script>

<style lang='scss' scoped>

</style>