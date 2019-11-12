<template>
	<div class="rdm-container">
		<div class="row">
			<div class="col-md-4">
				<resource-details-summary 
					:summary-data="resource" 
					:readonly="readonly"
				/>
			</div>
		</div>
		<div class="row">
			<div class="col-md-4">
				<section-heading title="Operating System" size="large" />
				<editable-labeled-item-list
					:readonly="readonly"
					:labeled-items="osLabeledItems"
					edit-type="text-input"
				/>
			</div>
			<div class="col-md-4">
				<section-heading title="Configured Machine" size="large" />
				<editable-labeled-item-list
					:readonly="readonly"
					:labeled-items="configMachineLabeledItems"
				/>
			</div>
			<div class="col-md-4">
				<section-heading title="Emulator" size="large" />
				<editable-labeled-item-list
					:readonly="readonly"
					:labeled-items="emulatorLabeledItems"
					edit-type="text-input"
				/>
			</div>
		</div>
		<div class="row">
			<div class="col-md-4">
				<section-heading title="Configured Drives" size="large" />
				<configured-drives
					:readonly="readonly"
					:drives="resource.drives"
					edit-type="configured-drives"
				/>
			</div>
			<div class="col-md-4">
				<section-heading title="UI options" size="large" />
				<editable-labeled-item-list
					:readonly="readonly"
					:labeled-items="uiOptionLabeledItems"
					edit-type="checkbox"
				/>
			</div>
		</div>
		<!-- <div class="row">
            <div class="softwareIncluded col-md-12 vrd-subsection">
                <section-heading title="Software Included In This Resource" size="large" />
                <div class="active-software-items" v-if="isSoftware">
                    <selectable-card :data="resource" />
                </div>
            </div>
        </div> -->
		<!-- <div class="row">
            <div class="thisIncludedIn col-md-12 vrd-subsection">
                <section-heading title="This Resource Is Included In" size="large" />
            </div>
        </div> -->
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

    /**
	 * Parses the environment data for emulator-specific properties
	 */
	get emulatorLabeledItems() : ILabeledItem[] {
		let emuItems = [];

		if (this.resource.emulator) {
			emuItems.push({
				label: 'Name',
				value: this.resource.emulator
			});
		}

		if (this.resource.containerName) {
			emuItems.push({
				label: 'Container Name',
				value: this.resource.containerName
			});
		}

		if (this.resource.containerVersion) {
			emuItems.push({
				label: 'Container Version',
				value: this.resource.containerVersion
			});
		}

		if (this.resource.nativeConfig) {
			emuItems.push({
				label: 'Emulator Configuration',
				value: this.resource.nativeConfig
			});
		}

		return emuItems;
    }
    
    /**
	 * Parses the environment data for emulator-specific properties
	 */
	get drives() {
        return this.resource.drives ? this.resource.drives : [];
    }
    
	get configMachineLabeledItems() : ILabeledItem[] {
		return [];
	}

	get osLabeledItems() : ILabeledItem[] {
		return [
            { label: 'Resource Name', value: this.resource.title.split('-')[0].trim() },
            { label: 'Display Resolution', value: '800x600' },
            { label: 'Color Depth', value: 'True Color' },
            { label: 'Region', value: 'U.S.' },
            { label: 'Time Zone', value: 'Eastern Standard Time' },
            { label: 'Date/Time', value: '1:19PM 5/3/2019' },
            { label: 'Language', value: 'English' },
            { label: 'Login Name', value: '<username>' },
            { label: 'Login password', value: '<password>' },
        ];
    }

    get uiOptionLabeledItems(): ILabeledItem[] {
        return [
            { label: 'Environment can print', value: true },
            { label: 'Relative Mouse (Pointerlock)', value: true },
            { label: 'WebRTC Audio (Beta)', value: false },
            { label: 'Requires clean shutdown', value: false },
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