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
	background-color: lighten($light-neutral, 80%);
	border-bottom: solid 2px darken($light-neutral, 10%);
	color: darken($dark-neutral, 80%);
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

.disabled {
	cursor: not-allowed;

	&:hover {
		background-color: lighten($light-neutral, 80%);
	}

	.ra-icon,
	.ra-info {
		opacity: 0.45;
	}
}

@font-face {
	font-family: EaasiIcon;
	src: url('../../assets/iconsEaaSI.ttf') format('truetype');
}

.ra-icon {
	font-family: EaasiIcon, fantasy;
	color: $dark-neutral;
	font-size: 3rem;
	padding-left: 0.4rem;
	width: 4rem;
}

</style>