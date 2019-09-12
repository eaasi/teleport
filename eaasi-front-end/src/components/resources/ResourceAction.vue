<template functional>
	<div class="resource-action flex-row" @click="listeners.click">
		<div class="ra-icon">
			<i :class="`fas fa-fw fa-${props.action.icon}`"></i>
		</div>
		<div class="ra-info flex-adapt">
			<b>{{ props.action.label }}</b>
			<p class="no-mb">{{ props.action.description }}</p>
		</div>
		<div class="ra-arrow flex flex-center">
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

}

</script>

<style lang="scss">
.resource-action {
	background-color: lighten($light-neutral, 60%);
	border-bottom: solid 2px darken($light-neutral, 10%);
	color: $dark-blue;
	cursor: pointer;
	padding: 1rem 0.5rem;
	transition: background-color 0.2s;

	&:hover {
		background-color: lighten($light-neutral, 20%);
	}

	p {
		color: $grey;
		font-size: 1.4rem;
		margin-top: 0.3rem;
	}
}

.ra-icon {
	font-size: 2.4rem;
	width: 4rem;
}

.ra-arrow {
	background-color: #FFFFFF;
	border-radius: 50%;
	height: 2.8rem;
	width: 2.8rem;

	i.fas {
		font-size: 1.2rem;
	}
}
</style>