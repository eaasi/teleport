<template>
	<div id="notifications">
		<div v-if="notifications.length > 0">
			<div class="notif-wrapper flex flex-column">
				<ui-notification
					v-for="(notification, index) in notifications"
					:key="index"
					:label="notification.label"
					:icon="notification.icon"
					@close="closeNotification(notification)"
					:color-preset="notification.type"
				/>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import { INotification } from '@/types/Notification';
import eventBus from '../../utils/event-bus';

@Component({
    name: 'Notifications'
})
export default class Notifications extends Vue {

    /* Data
    ============================================*/
    notifications: INotification[] = [];

    /* Methods
    ============================================*/
    showNotification(notification: INotification) {
        this.notifications.push(notification);
        setTimeout(() => {
            this.notifications = this.notifications.filter(n => notification.id != n.id);
        }, notification.time);
    }

    closeNotification(notification: INotification) {
        this.notifications = this.notifications.filter(n => n.id !== notification.id);
    }

    /* Lifecycle Hooks
    ============================================*/
    beforeMount() {
        eventBus.$on('notification:show',
            (notification: INotification) => this.showNotification(notification)
        );
    }

    beforeDestroy() {
        eventBus.$off('notification:show');
    }

}
</script>

<style lang='scss' scoped>
#notifications {
	position: absolute;
	right: 1rem;
	top: 7rem;
	z-index: 100;
	.notif-wrapper {
		span {
			margin-bottom: 1rem;
		}
	}
}
</style>