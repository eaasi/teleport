<template>
	<span :class="`ui-notification-container ${colorPreset}`">
		<slot>
			<span v-if="icon" :class="`fas fa-${icon}`" style="margin-right: 1rem;"></span>
			<span>{{ label }}</span>
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
                return 'exclamation-triangle';
                break;
            case 'info':
                return 'info-circle';
                break;
            case 'warning':
                return 'question-circle';
                break;
        }
    }

}
</script>

<style lang='scss'>
.ui-notification-container {
	border-radius: 5px;
	box-shadow: 0px 3px 6px #0000004D;
	color: #ffffff;
	padding: 2rem;
	&.success {
		background-color: darken($green, 30%);
	}

	&.info {
		background-color: darken($light-blue, 20%);
	}

	&.warning {
		background-color: darken($orange, 20%);
	}

	&.danger {
		background-color: darken($red, 20%);
	}
}
</style>