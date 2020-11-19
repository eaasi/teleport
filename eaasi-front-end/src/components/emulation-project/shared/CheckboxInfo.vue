<template>
	<div class="flex-row checkbox-info flex flex-row justify-between">
		<checkbox
			:label="label"
			:value="value"
			@input="$emit('input', !value)"
			@change="$emit('change');"
		/>
		<span class="fas fa-info-circle" v-if="infoText"></span>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import EaasiIcon from '@/components/global/icons/EaasiIcon.vue';

@Component({
    name: 'CheckboxInfo',
    components: {
        EaasiIcon
    }
})
export default class CheckboxInfo extends Vue {

    /* Props
    ============================================*/
    @Prop({ type: Boolean, required: true })
    readonly value: boolean;

    @Prop({ type: String, required: false })
    readonly label: string;

    @Prop({ type: String })
    readonly infoText: string;

    /* Computed
    ============================================*/

    /* Data
    ============================================*/

    /* Methods
    ============================================*/

    /* Lifecycle Hooks
    ============================================*/

}
</script>

<style lang='scss' scoped>
.checkbox-info {
	background-color: lighten($light-blue, 90%);
	padding: 1rem;

	.fas {
		color: $dark-blue;
		cursor: pointer;
		font-size: 2rem;
	}
}
</style>