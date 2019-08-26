<template>
	<slide-menu class="resource-actions-slide-menu">
		<div class="ra-resource-title">
			{{ resource.title }}
		</div>
		<resource-action
			v-for="a in actions"
			:action="a"
			:key="a.label"
		/>
	</slide-menu>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { IAction } from 'eaasi-nav';
import { IEaasiResource } from 'eaasi-resource';
import { ResourceAction } from './ResourceAction';
import SlideMenu from '@/components/layout/SlideMenu.vue';

@Component({
	name: 'ResourceActionsMenu',
	components: {
		ResourceActionsMenu,
		SlideMenu
	}
})
export default class ResourceActionsMenu extends Vue {

	/* Props
	============================================*/

	@Prop({type: Boolean, required: true})
	readonly open: boolean

	@Prop({type: Object as () => IEaasiResource, required: true})
	readonly resource: IEaasiResource

	/* Data
	============================================*/

	actions: IAction[] = [
		{
			label: 'View Details',
			description: 'Review full resource details',
			icon: 'document',
		}
	]

	/* Computed
	============================================*/

	/* Methods
	============================================*/

	/* Lifecycle Hooks
	============================================*/

	/* Watchers
	============================================*/

}

</script>

<style lang="scss"></style>