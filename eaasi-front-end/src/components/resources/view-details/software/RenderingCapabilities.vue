<template>
	<div :class="['li-container', 'editable-container', { readonly }]">
		<div class="li-label">
			{{ nativeFMTs.label }}
		</div>
		<div>
			<div v-for="fmt in nativeFMTs.value" :key="fmt.id" class="flex flex-row justify-between" style="margin-top: 1rem;">
				<div>{{ fmt }}</div>
				<span
					class="fas fa-times remove-icon-btn"
					@click="$emit('remove', fmt)"
				></span>
			</div>
		</div>
		<text-input
			class="input-wrapper"
			style="margin-bottom: 1rem;"
			v-model="newFMTs"
			placeholder="Native PUID"
			:readonly="nativeFMTs.readonly || readonly"
		/>
		<ui-button
			size="sm"
			:disabled="!newFMTs || readonly"
			@click="add"
		>
			Add Native PUID
		</ui-button>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { ILabeledEditableItem } from '@/types/ILabeledItem';
import { jsonCopy } from '@/utils/functions';

@Component({
    name: 'EditableTextItem'
})
export default class EditableTextItem extends Vue {

    /* Props
    ============================================*/
    @Prop({ type: Object as () => ILabeledEditableItem })
    nativeFMTs: ILabeledEditableItem;

    @Prop({ type: Boolean })
    readonly: Boolean;

    /* Computed
    ============================================*/
    get changed() {
        return this.nativeFMTs.value !== this.localItem.value;
    }

    /* Data
    ============================================*/
    localItem: ILabeledEditableItem = jsonCopy(this.nativeFMTs);
    newFMTs: string = null;

    add(fmt: string) {
        this.$emit('add', this.newFMTs);
        this.newFMTs = null;
    }

}
</script>

<style lang='scss'>
.editable-container {

	.remove-icon-btn {
		color: $red;
		font-size: 1.5rem;
	}

	.eaasi-form-control {
		.eaasi-input-wrapper {
			input {
				color: $dark-neutral;
			}
		}
	}

	&.readonly {
		.eaasi-form-control {
			.eaasi-input-wrapper {
				border-bottom: 1px solid darken($light-neutral, 10%);
			}
		}
	}

	.input-wrapper {

		&.changed {
			background: lighten($yellow, 60%);
		}
	}
}
</style>