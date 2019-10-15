<template>
    <div class="ui-chip flex-row">
        <span class="ui-chip-content">
            <slot></slot>
        </span>
        <div class="close-icon-container" v-if="close" @click="$emit('close')">
            <i class="fas fa-times" />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';

/**
 * A general chip for UI interaction
 * @example ../docs/UiChip.Example.md
 */
@Component({
    name: 'UiChip'
})
export default class UiChip extends Vue {

    /* Props
    ============================================*/

    /**
	 * Add close button
	 */
	@Prop({type: Boolean, required: false, default: false})
    readonly close: boolean;

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

<style lang='scss'>
.ui-chip {
    background-color: lighten($light-blue, 90%);
    border: 2px solid lighten($light-blue, 60%);
    border-radius: 20px;
    padding: .2rem .8rem;
    .ui-chip-content {
        padding: .7rem;
        white-space: nowrap;
    }
    .close-icon-container {
        font-size: .8em;
        border-left: 1px solid lighten($light-blue, 60%);
        padding: 0.7rem 0 0.7rem 0.7rem;
        cursor: pointer;
    }
}
</style>