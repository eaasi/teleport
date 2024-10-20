<template>
	<div class="import-select">
		<div v-if="importType" class="import-selected padded">
			<div class="flex-row">
				<label for="importType">I want to import a</label>
				<select-list v-model="importType" class="no-mb flex-adapt" idType="importType">
					<option value="content">
						Content File(s)
					</option>
					<option value="software">
						Software Resource
					</option>
					<option value="image">
						Computer Image
					</option>
					<!-- WD: Temporarily Removed due to https://gitlab.com/eaasi/program_docs/eaasi/-/issues/975 -->
					<!--					<option value="image" v-if="userCanImportEnvironment">-->
					<!--						Image Import-->
					<!--					</option>-->
				</select-list>
			</div>
		</div>
		<div class="import-types padded" v-else>
			<h2>I want to import a...</h2>
			<div class="row">
				<div class="col-md-4">
					<options-box title="Content Object" icon="file">
						Files or objects from a digital collection to be added to an environment for access.
						<template slot="footer">
							<ui-button
								block
								@click="chooseImportType('content')"
							>
								Import Content
							</ui-button>
						</template>
					</options-box>
				</div>

				<div class="col-md-4 option-box-container">
					<options-box title="Software Object" icon="file">
						Media or files required to install or operate software within an emulation environment.
						<template slot="footer">
							<ui-button
								block
								@click="chooseImportType('software')"
							>
								Import Software
							</ui-button>
						</template>
					</options-box>
				</div>

				<div class="col-md-4 option-box-container" v-if="userCanImportEnvironment">
					<options-box
						title="Computer Image"
						icon="file"
					>
						Disk image of an existing computer to be configured as a content environment or of a pre-installed operating system to be configured as a base environment.
						<template slot="footer">
							<ui-button
								block
								@click="chooseImportType('image')"
							>
								Import Image
							</ui-button>
						</template>
					</options-box>
				</div>
				<!-- WD: Temporarily Removed due to https://gitlab.com/eaasi/program_docs/eaasi/-/issues/975 -->
				<!--				<div class="col-md-4 option-box-container" v-if="userCanImportEnvironment">-->
				<!--					<options-box-->
				<!--						title="Image Import"-->
				<!--						icon="file"-->
				<!--						header="Less Common"-->
				<!--					>-->
				<!--						Image of a hard drive with an operating system, content files optional-->
				<!--						<template slot="footer">-->
				<!--							<ui-button-->
				<!--								block-->
				<!--								sub-label="Examples: .iso / .dd / .raw / .e01"-->
				<!--								@click="chooseImportType('image')"-->
				<!--							>-->
				<!--								Import Image-->
				<!--							</ui-button>-->
				<!--						</template>-->
				<!--					</options-box>-->
				<!--				</div>-->
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import PermissionResolver from '@/services/Permissions/PermissionResolver';
import {IEaasiUser} from 'eaasi-admin';
import Vue from 'vue';
import { Component, Watch } from 'vue-property-decorator';
import {Get, Sync} from 'vuex-pathify';
import { ImportType } from '@/types/Import';

@Component({
	name: 'ImportSelect'
})
export default class ImportSelect extends Vue {

	/* Computed
	============================================*/

	@Sync('import/importStep')
	step: number;

	@Sync('import/importType')
	importType: ImportType;

	@Get('loggedInUser')
	user: IEaasiUser;

	@Get('permissions')
	permit: PermissionResolver;

	get userCanImportEnvironment() {
		if (!this.user) return false;
		return this.permit.allowsSingleEnvironmentImport();
	}

	/* Methods
	============================================*/

	chooseImportType(chosenImportType: ImportType) {
		this.importType = chosenImportType;
		this.step++;
	}

	/* Watchers
	============================================*/

	/**
	 * Reset import metadata / files if type is changed by user
	 */
	@Watch('importType')
	onTypeChange(newType) {
		if(!newType) return;
		this.$store.commit('import/INIT_FOR_TYPE');
	}

}

</script>

<style lang="scss">

.import-select h3 {
	box-sizing: border-box;
	margin-bottom: 2rem;
}

.import-selected {

	.eaasi-select {
		margin-left: 1rem;
		max-width: 40rem;
	}

	label {
		font-size: 1.8rem;
		margin-bottom: 0;
	}
}

.import-types {
	background-color: #FFFFFF;
	.eb-wrapper {
		flex: 0 0 31%;
		margin-bottom: 3rem;
	}
}

</style>