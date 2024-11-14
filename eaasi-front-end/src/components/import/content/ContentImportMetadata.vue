<template>
	<div class="content-metadata-form">
		<div v-if="step > 1" class="sm-summary padded">
			<text-input
				readonly
				rules="required"
				label="Name"
				v-model="title"
			/>
			<ui-button
				color-preset="white"
				icon="chevron-left"
				@click="step = 1"
			>
				Back To Metadata
			</ui-button>
		</div>
		<div v-else class="content-import">
			<eaasi-form ref="_form" @submit="step++">
				<div class="row">
					<div class="content-form-input">
						<text-input
							label="Name"
							v-model="content.title"
							rules="required"
							required
						/>
					</div>
				</div>
				<div class="row">
					<!--See design spec for content once metadata integrated-->
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
import { Component } from 'vue-property-decorator';
import { Sync } from 'vuex-pathify';
import ContentImportResource from '@/models/import/ContentImportResource';

@Component({
	name: 'ContentImportMetadata',
})
export default class ContentImportMetadata extends Vue {

	/* Computed
	============================================*/

	@Sync('import/importStep')
	step: number;

	@Sync('import/content')
	content: ContentImportResource;

	@Sync('import/content@title')
	title: string;

	/* Methods
	============================================*/

	submitForm() {
		// Workaround vue/typescript bug where _form type is 'Vue' rather than 'EaasiForm'
		let form: any = this.$refs._form;
		form.submit();
	}
}

</script>

<style lang="scss">
.content-import {
	.row {
		margin: 0;
		width: -webkit-fill-available;

		.content-form-input {
			width: -webkit-fill-available;
		}
	}
}
</style>