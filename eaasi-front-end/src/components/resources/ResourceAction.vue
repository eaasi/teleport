<template>
	<div
		:class="['resource-action', 'flex-row', { disabled: !action.isEnabled }]"
		@click="emitClickEvent"
	>
		<div class="ra-icon">
			<span class="eaasi-icon">{{ action.icon }}</span>
		</div>
		<div class="ra-info flex-adapt">
			<strong>{{ action.label }}</strong>
			<p class="no-mb" v-if="action.description">{{ action.description }}</p>
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
	readonly action: IAction;

	emitClickEvent() {
		this.$emit('click');
	}
}

</script>

<style lang="scss">
.resource-action {
	background-color: $medium-grey;
	border-bottom: solid 2px $medium-grey;
	color: $black;
	cursor: pointer;
	padding: 1rem 0.5rem;
	transition: background-color 0.2s;

	&:hover {
		background-color: $green;

		.ra-icon {
			color: $black;
		}
	}

	p {
		color: $dark-grey;
		font-size: 1.4rem;
		margin-top: 0.3rem;
	}
}

.disabled {
	cursor: not-allowed;
	opacity: 0.5;

	&:hover {
		background-color: $light-grey;
	}
}

@font-face {
	font-family: EaasiIcon;
	src: url('../../assets/EaaSI_icons.ttf') format('truetype');
}

.ra-icon {
	color: $dark-light-grey;
	font-family: EaasiIcon, fantasy;
	font-size: 3rem;
	padding-left: 0.4rem;
	width: 4rem;
}

</style>