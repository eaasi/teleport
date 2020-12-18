<template>
	<div id="installAndUpdateSection">
		<div class="rtl-header padded-xl">
			<div class="container-xs">
				<div class="flex-row justify-between">
					<h1>Install & Updates</h1>
				</div>
			</div>
		</div>
		<div class="padded-xl container-xs">
			<h4 class="uppercase medium">Synchronize Backend</h4>
			<ui-button @click="syncBackend">
				Synchronize Backend
			</ui-button>
			<div class="section-divider padded"></div>
		</div>
		<div class="padded-xl container-xs">
			<h4 class="uppercase medium">Migrate old DB data</h4>
			<ui-button @click="migrateDatabase">
				Migrate Old Data
			</ui-button>
			<div class="section-divider padded"></div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import AdminScreen from '../AdminScreen.vue';
import { generateNotificationError, generateNotificationSuccess } from '../../../helpers/NotificationHelper';
import { INotification } from '../../../types/Notification';
import eventBus from '../../../utils/event-bus';

@Component({
	name: 'InstallAndUpdateManagement'
})
export default class InstallAndUpdateManagement extends AdminScreen {

	/* Methods
	============================================*/

	async syncBackend() {
		const res = await this.$store.dispatch('admin/dbDataMigration');
		const notification = res ? generateNotificationSuccess('Successfully synchronized archives') 
			: generateNotificationError('Failed to synchronize archives');
		eventBus.$emit('notification:show', notification);
	}
	
	async migrateDatabase() {
		const res = await this.$store.dispatch('admin/syncEnvironments');
		const notification = res ? generateNotificationSuccess('Successfully migrated old data') 
			: generateNotificationError('Failed to migrate old data');
		eventBus.$emit('notification:show', notification);
	}

}
</script>

<style lang='scss' scoped>
.rtl-header {
	background-color: lighten($light-neutral, 60%);
	padding-bottom: 2.5rem;

	h1 {
		font-size: 1.8rem;
	}
}
</style>