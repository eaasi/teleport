<template>
	<div id="nodeTroubleshooting">
		<div class="rtl-header padded-xl">
			<div class="container-xs">
				<div class="flex-row justify-between">
					<h1>Troubleshooting</h1>
				</div>
			</div>
		</div>
		<div class="padded-xl container-xs">
			<h4 class="uppercase medium">Download Server Logs</h4>
			<p>
				Helpful for troubleshooting back-end services like emulator, resource replication, resource import, metadata synchronization, etc.
			</p>
			<a
				:href="emilErrorDownloadUrl"
				target="blank"
				noreferrer
				nofollow
			>
				<ui-button class="btn-info-modal-close" icon="cloud-download">
					Download
				</ui-button>
			</a>
			<div class="section-divider padded"></div>
		</div>
		<div class="padded-xl container-xs">
			<h4 class="uppercase medium">Download Web API Logs</h4>
			<p>
				Helpful for troubleshooting of Authentication/Authorization, User Credentials, Front-End facing features: bookmarks, resource-to-user relationship, search and discovery, etc.
			</p>
			<a
				:href="webApiErrorDownloadUrl"
				target="blank"
				noreferrer
				nofollow
			>
				<ui-button class="btn-info-modal-close" icon="cloud-download">
					Download
				</ui-button>
			</a>
			<div class="section-divider padded"></div>
		</div>
		<div class="padded-xl container-xs">
			<h4 class="uppercase medium">REFRESH STORAGE INDEX</h4>
			<p>
				Helpful for troubleshooting problems with importing resources.
			</p>
			<div class="select-archive-group">
				<h5 class="select-archive-header">Select archive(s) to refresh:</h5>
				<checkbox
					label="image archive"
					:value="isChecked('image_archive')"
					@input="onToggle('image_archive')"
					style="margin-left: 10px;"
				/>
				<checkbox
					label="object archive"
					:value="isChecked('object_archive')"
					@input="onToggle('object_archive')"
					style="margin-left: 10px;"
				/>
				<checkbox
					label="software archive"
					:value="isChecked('software archive')"
					@input="onToggle('software archive')"
					style="margin-left: 10px;"
				/>
			</div>
			<span @click="refreshArchive(checkedArchives)">
					<ui-button class="btn-info-modal-close" icon="cloud-download">
					 Refresh
				 </ui-button>
			</span>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import AdminScreen from '../AdminScreen.vue';
import config from '@/config';
import EaasiIcon from '@/components/global/icons/EaasiIcon.vue';
import eventBus from '@/utils/event-bus';
import { generateId } from '@/utils/functions';
import { INotification } from '@/types/Notification';

@Component({
    name: 'TroubleshootingSection',
	components: {
		EaasiIcon
	}
})
export default class TroubleshootingSection extends AdminScreen {

    /* Props
    ============================================*/

    /* Computed
    ============================================*/
    get emilErrorDownloadUrl(): string {
        return config.EMIL_SERVICE_ENDPOINT + '/error-report';
	}

	get webApiErrorDownloadUrl(): string {
		return config.SERVICE_URL + '/error-report/download-all';
	}

    /* Data
    ============================================*/

	checkedArchives: string[] = [];
    /* Methods
    ============================================*/

	isChecked(type: string) {
		return this.checkedArchives.includes(type);
	}

	onToggle(type: string) {
		if (this.checkedArchives.includes(type)) {
			this.checkedArchives = this.checkedArchives.filter(f => f !== type);
		} else {
			this.checkedArchives.push(type);
		}
	}

	async refreshArchive(checkedArchives: string[]) {
		const result = await this.$store.dispatch('resource/syncImagesUrl');
		console.log('result 1 ', result, checkedArchives);
		if (!result) return;
		if (result.status === '0') {
			this.$emit('full-refresh');
		} else {
			let notification: INotification = {
				label: 'Failed to refresh archive',
				time: 5000,
				type: 'danger',
				id: generateId()
			};
			eventBus.$emit('notification:show', notification);
		}
	}

    /* Lifecycle Hooks
    ============================================*/

}
</script>

<style lang='scss' scoped>

.select-archive-group {
	margin: 10px 0;

	.select-archive-header {
		margin: 20px 0;
	}

	.eaasi-checkbox {
		margin-bottom: 10px;
	}
}

</style>