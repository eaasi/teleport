<template>
	<div class="environment-import-metadata-fast">
		<div class="row">
			<div class="col-md-12">
				<text-input
					label="Name"
					placeholder="Enter a name or title for this resource"
					:readonly="readonly"
					value=""
					v-model="title"
				/>
			</div>

			<div class="col-md-6">
				<select-list
					v-model="chosenTemplate"
					placholder="Choose a System"
					class="no-mb flex-adapt"
					label="Choose a System"
					rules="required"
				>
					<option
						v-for="template in availableTemplates"
						:key="template.id"
						:value="template.id"
					>
						{{ template.label }}
					</option>
				</select-list>
			</div>
		</div>

		<div class="row">
			<div class="col-md-6">
				<text-input
					v-if="chosenTemplate"
					readonly
					label="System Architecture"
					v-model="chosenTemplateArchitecture"
					value=""
					rules="required"
				/>

				<text-input
					v-if="chosenTemplate"
					readonly
					label="Emulator"
					v-model="chosenTemplateEmulator"
					value=""
					rules="required"
				/>

				<text-input
					v-if="chosenTemplate"
					readonly
					label="Config"
					v-model="chosenTemplateNativeConfig"
					value=""
					rules="required"
				/>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import Vue from 'vue';
	import { Component, Prop } from 'vue-property-decorator';
	import { Get, Sync } from 'vuex-pathify';
	import { operatingSystems } from '@/models/admin/OperatingSystems';

	@Component({
		name: 'EnvironmentImportMetadataFast',
	})
	export default class EnvironmentImportMetadataFast extends Vue {

		/* Props
        ============================================*/

		/**
		 * Pass-through as readonly attribute to all form fields
		 */
		@Prop({type: Boolean, required: false})
		readonly readonly: boolean;

		/* Computed
        ============================================*/

		@Sync('import/environment@title')
		title: string;

		@Sync('import/environment@chosenTemplateId')
		chosenTemplate: string;

		@Sync('import/environment@nativeConfig')
		nativeConfig: string;

		@Get('resource/availableTemplates')
		readonly availableTemplates: any[];

		@Sync('import/filesToUpload')
		filesToUpload: any[];

		get chosenTemplateData() {
			return this.availableTemplates.find(template => {
				return template['id'] === this.chosenTemplate;
			});
		}

		// TODO: Request update to structure the serialized data coming from the OpenSLX Eaasi API.
		/* ie:
        {
            id: "qemu-win98",
            label: "Windows 98 (USB pointer)",
            properties: [
                {
                    name: "Architecture",            <-- why name keys "name" and "value"?
                    value: "x86_64"
                },
                {
                    name: "EmulatorContainer",
                    value: "Qemu"
                }
            ]
        },

        // TODO: Suggestion - serialize to the interface that already implicitly exists -
            properties: { architecture: 'foo', emulatorContainer: 'bar' }
        */

		get chosenTemplateEmulator() {
			const result = this.chosenTemplateData.properties
				.find(obj => obj['name'] === 'EmulatorContainer')['value'];
			return result ? result : null;
		}

		get chosenTemplateArchitecture() {
			const result = this.chosenTemplateData.properties
				.find(obj => obj['name'] === 'Architecture')['value'];
			return result ? result : null;
		}

		get chosenTemplateNativeConfig() {
			let config = this.chosenTemplateData['native_config'];
			this.nativeConfig = config;
			return config;
		}

		/* Lifecycle Hooks
        ============================================*/
		created() {
			this.$store.dispatch('resource/getTemplates');
		}
	}

</script>

<style lang="scss"></style>