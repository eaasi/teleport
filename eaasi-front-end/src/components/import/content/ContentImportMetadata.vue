<template>
	<div class="content-metadata-form">
		<div v-if="step > 1" class="sm-summary padded">
			<text-input
				readonly
				label="Name"
				v-model="content.title"
			/>
			<ui-button
				secondary
				icon="chevron-left"
				@click="step = 1"
			>
				Back To Metadata
			</ui-button>
		</div>
		<div v-else class="padded">
			<h3>About This Resource</h3>
			<eaasi-form ref="_form" @submit="step++">
				<div class="row">
					<div class="col-md-12">
						<text-input
							label="Name"
							v-model="content.title"
							rules="required"
						/>
					</div>
				</div>
				<div class="row">
					<div class="col-md-6">
						<text-input
							label="Local Identifier"
							v-model="content.localIdentifier"
						/>
					</div>
					<div class="col-md-6">
						<text-input
							label="Local Identifier Source"
							v-model="content.localIdentifierSource"
						/>
					</div>
				</div>
			</eaasi-form>
			<ui-button
				@click="submitForm()"
				icon-right
				icon="chevron-right"
			>
				Continue
			</ui-button>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { Sync } from 'vuex-pathify';

@Component({
	name: 'ContentImportMetadata',
})
export default class ContentImportMetadata extends Vue {

	/* Computed
	============================================*/

	@Sync('import/importStep')
	step: number

	/* Data
	============================================*/

	// TODO: This should be typed and come from the import store
	content: any = {
		title: '',
		localIdentifier: '',
		localIdentifierSource: ''
	}

	/* Methods
	============================================*/

	submitForm() {
		// Workaround vue/typescript bug where _form type is 'Vue' rather than 'EaasiForm'
		let form: any = this.$refs._form;
		form.submit();
	}

}

</script>

<style lang="scss"></style>