<template>
	<div v-if="list">
		<select-list
			class="no-mb flex-adapt"
			label="Template Version"
			:value="selectedOsTitle"
			@input="onChange"
			:disabled="readonly"
		>
			<option value="" selected disabled>Select Operating version...</option>
			<option v-for="os in osList" :key="os.name">
				{{ os.title }}
			</option>
		</select-list>
	</div>
	<div v-else class="flex flex-row justify-between">
		<selectable-container
			v-for="item in osList"
			:key="item.title"
			:title="item.title"
			:is-selected="item.value === selectedOsValue"
			@input="$emit('input', item)"
		>
			<div>
				<img :src="item.icon" :alt="`${item.title} icon`" />
			</div>
		</selectable-container>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import SelectableContainer from '@/components/global/selectable-container/SelectableContainer.vue';
import { defaultOsList } from '@/utils/constants';
import { IUIOsItem } from '@/types/Resource';

@Component({
	name: 'OsPicker',
	components: {
		SelectableContainer
	}
})
export default class OsPicker extends Vue {

	/* Props
	============================================*/
	@Prop({ type: Array as () => IUIOsItem[], default: () => defaultOsList })
	readonly osList: IUIOsItem[];

	@Prop({ type: Object as () => IUIOsItem })
	readonly selectedOs: IUIOsItem;

	@Prop({ type: Boolean, default: false })
	readonly list: boolean;

	@Prop({ type: Boolean, default: false })
	readonly readonly: boolean;

	/* Computed
	============================================*/
	get selectedOsTitle(): string {
		return this.selectedOs ? this.selectedOs.title : null;
	}

	get selectedOsValue(): string {
		return this.selectedOs ? this.selectedOs.value : null;
	}

	/* Data
	============================================*/

	/* Methods
	============================================*/
	onChange(osName: string) {
		return this.$emit('input', this.osList.find(os => os.title === osName));
	}

	/* Lifecycle Hooks
	============================================*/

}
</script>

<style lang='scss' scoped>

</style>