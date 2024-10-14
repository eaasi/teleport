<template functional>
	<div class="resource-details-item">
		<div class="rd-label">{{ props.name }}</div>
		<p class="rd-description">{{ props.value }}</p>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component({
	name: 'ResourceDetail',
})
export default class ResourceDetail extends Vue {

	/* Props
	============================================*/

	/**
	 * The detail's name
	 */
	@Prop({type: String, required: true})
	readonly name: string

	/**
	 * The detail's value
	 */
	@Prop({type: String, required: true})
	readonly value: string

}

</script>

<style lang="scss">
.resource-details-item {
	color: $medium-grey;

	.rd-label {
		color: lighten($medium-grey, 20%);
		font-size: 1.2rem;
		text-transform: uppercase;
	}

	.rd-description {
		border-bottom: solid 1px lighten($medium-grey, 60%);
		font-size: 1.6rem;
		margin: 0.4rem 0 1rem;
		padding-bottom: 1rem;
	}
}
</style>