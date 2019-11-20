<template>
	<div
		v-if="drives.length > 0"
		class="lil-container"
	>
		<div
			v-for="(drive, index) in drives"
			:key="index"
		>
			<div class="li-container">
				<div class="li-label">
					{{ drive.type }}
				</div>
				<p class="li-value flex-row justify-between">
					<span style="display: block; max-width: 24.5rem;">
						Filesystem: {{ drive.filesystem ? drive.filesystem : 'Not specified' }}
					</span>
					<span v-if="!readonly" class="icon-wrapper flex-row" style="float: right;">
						<i class="fas fa-edit dark-blue" style="margin-right: 0.5rem;" @click="edit(index)"></i>
						<i class="fas fa-times red" @click="remove(index)"></i>
					</span>
				</p>
			</div>
		</div>
		<ui-button
			v-if="!readonly"
			size="sm"
			color-preset="light-blue"
			icon="plus"
			@click="add"
		>
			Add Drive
		</ui-button>
	</div>
	<div v-else class="lil-container">
		<span class="lil-no-data">No Data</span>
		<ui-button
			v-if="editable"
			size="sm"
			color-preset="light-blue"
			icon="plus"
			@click="add"
		>
			Add Drive
		</ui-button>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import { IDrive } from '@/types/Resource';

@Component({
    name: 'ConfiguredDrives'
})
export default class ConfiguredDrives extends Vue {

    /* Props
    ============================================*/
	@Prop({ type: Array as () => IDrive[], required: true })
	drives: IDrive[]

    @Prop({ type: Boolean })
    readonly: Boolean;

    /* Computed
    ============================================*/

    /* Data
    ============================================*/
    localDrives: IDrive[] = this.drives;

    /* Methods
    ============================================*/
    remove(index: number) {
        this.drives = this.drives.splice(index, 1);
    }

    edit(index: number) {

    }

    add() {

    }

    /* Lifecycle Hooks
    ============================================*/

}
</script>

<style lang='scss' scoped>
.lil-container {
	position: relative;
	.fas {
		cursor: pointer;
		display: block;
		font-size: 2rem;
	}
	.dark-blue {
		color: $dark-blue;
	}
	.red {
		color: $red;
	}
}
</style>