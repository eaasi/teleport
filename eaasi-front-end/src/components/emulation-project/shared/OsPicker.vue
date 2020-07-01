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
				<img :src="item.icon" />
			</div>
		</selectable-container>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import SelectableContainer from '@/components/global/selectable-container/SelectableContainer.vue';
const genericMachineIcon = require('../../../../assets/img/other.png');
const linuxMachineIcon = require('../../../../assets/img/linux.png');
const appleMachineIcon = require('../../../../assets/img/apple.png');
const windowsMachineIcon = require('../../../../assets/img/windows.png');

const defaultOsList: IOsItem[] = [
	{ icon: windowsMachineIcon, title: 'Windows', value: 'windows' },
	{ icon: linuxMachineIcon, title: 'Linux', value: 'linux' },
	{ icon: appleMachineIcon, title: 'Apple', value: 'mac' },
	{ icon: genericMachineIcon, title: 'Other', value: 'other' }
];

export interface IOsItem {
	icon: string;
	title: string;
	value: string;
}

@Component({
	name: 'OsPicker',
	components: {
		SelectableContainer
	}
})
export default class OsPicker extends Vue {

	/* Props
	============================================*/
	@Prop({ type: Array as () => IOsItem[], default: () => defaultOsList })
	readonly osList: IOsItem[];

	@Prop({ type: Object as () => IOsItem })
	readonly selectedOs: IOsItem;

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