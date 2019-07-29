<template>
	<div class="eb-wrapper">
		<div
			:class="['eaasi-big-button', 'size-' + size]"
			role="button"
			@click="$emit('click')"
		>
			<div class="eb-icon" v-if="icon">
				<i :class="`fal fa-${icon}`"></i>
			</div>
			<label>{{ label }}</label>
			<div v-if="sublabel" class="eb-sublabel">
				{{ sublabel }}
			</div>
		</div>
		<div class="eb-info" v-if="info">
			<span>{{ info }}</span>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component({
	name: 'BigButton',
})
export default class BigButton extends Vue {

	/* Props
	============================================*/

	@Prop({type: String, required: false})
	readonly icon: string

	@Prop({type: String, required: true})
	readonly label: string

	@Prop({type: String, required: false})
	readonly sublabel: string

	@Prop({type: String, required: false, default: ''})
	readonly size: string

	@Prop({type: String, required: false})
	readonly info: string

}

</script>

<style lang="scss">
.eaasi-big-button {
	background-color: lighten($light-blue, 90%);
	border: solid 2px $light-blue;
	border-radius: 10px;
	color: $dark-blue;
	cursor: pointer;
	padding: 1.5rem 1.5rem 3.5rem;
	text-align: center;
	transition: background-color 0.3s;

	&:hover {
		background-color: lighten($light-blue, 70%);
	}

	label {
		color: $dark-blue;
		font-size: 1.8rem;
		font-weight: bold;
	}

	.eb-icon {
		font-size: 2.5rem;
		margin-bottom: 6px;
	}

	.eb-sublabel {
		color: $dark-neutral;
		margin-top: 6px;
	}
}

.eb-wrapper {
	max-width: 32rem;
}

.eb-info {
	background-color: lighten($light-neutral, 60%);
	border: solid 2px $light-neutral;
	border-radius: 0 0 10px 10px;
	color: $dark-neutral;
	font-size: 1.4rem;
	padding: 1.5rem 1.5rem 2rem;
	position: relative;
	text-align: center;
	top: -1.5rem;
}
</style>