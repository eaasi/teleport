<template>
	<span :class="`ui-notification-container ${colorPreset}`">
		<slot>
			<span class="fas fa-times close-icon" @click="$emit('close')"></span>
			<span v-if="icon" :class="`icon-notif fas fa-${icon}`" style="margin-right: 1rem;"></span>
			<span class="notif-label">{{ label }}</span>
		</slot>
	</span>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component({
    name: 'UiNotification'
})
export default class UiNotification extends Vue {

    /* Props
    ============================================*/
    @Prop({ type: String, required: true })
    readonly label: String;

    @Prop({ type: String, default: 'success' })
    readonly colorPreset: String;

    get icon(): String {
        switch (this.colorPreset) {
            case 'success':
                return 'check';
                break;
            case 'danger':
                return 'times-circle';
                break;
            case 'info':
                return 'info-circle';
                break;
            case 'warning':
                return 'exclamation-triangle';
                break;
        }
    }

}
</script>

<style lang='scss'>
.ui-notification-container {
	background: #ffffff;
	border: 1px solid #eeeeee;
	border-radius: 5px;
	box-shadow: 0px 3px 6px #0000004D;
	color: #000000;
	max-width: 40rem;
	padding: 2rem;
	position: relative;

	&.success {
		.icon-notif {
			color: darken($green, 30%);
		}
	}

	&.info {
		.icon-notif {
			color: darken($light-blue, 20%);
		}
	}

	&.warning {
		.icon-notif {
			color: darken($orange, 20%);
		}
	}

	&.danger {
		.icon-notif {
			color: darken($red, 20%);
		}
	}
	.close-icon {
		color: $medium-grey;
		cursor: pointer;
		padding: 1rem;
		position: absolute;
		right: 0.5rem;
		top: 0.5rem;
	}
	.notif-label {
		line-height: 2.3rem;
	}
}
</style>