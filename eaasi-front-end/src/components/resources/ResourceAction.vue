<template>
	<div class="resource-action flex-row">
		<div class="ra-icon">
			<i :class="`fas fa-fw fa-${action.icon}`"></i>
		</div>
		<div class="ra-info">
			<strong>{{ action.label }}</strong>
			<p>{{ action.description }}</p>
		</div>
		<div class="ra-arrow">
			<i class="fas fa-chevron-right"></i>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { IAction } from 'eaasi-nav';

@Component({
	name: 'ResourceAction',
})
export default class ResourceAction extends Vue {

	/* Props
	============================================*/
	@Prop({type: Object as () => IAction, required: true})
	readonly action: IAction

	/* Data
	============================================*/

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

<style lang="scss">
.resource-action {

}
</style>