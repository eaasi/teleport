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
				:href="BEErrorDownloadUrl"
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
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import AdminScreen from '../AdminScreen.vue';
import config from '@/config';
import EaasiIcon from '@/components/global/icons/EaasiIcon.vue';

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
	get BEErrorDownloadUrl(): string {
		return config.SERVICE_URL + '/error-report/download-all';
	}

	get webApiErrorDownloadUrl(): string {
		return config.SERVICE_URL + '/error-report/download-all';
	}

    /* Data
    ============================================*/

    /* Methods
    ============================================*/

    /* Lifecycle Hooks
    ============================================*/

}
</script>

<style lang='scss' scoped>

</style>