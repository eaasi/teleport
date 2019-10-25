<template functional>
	<div :class="`col-xs-${props.size}`">
		<slot></slot>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

/**
 * A thin functional wrapper around a parametrized `col-xs` div
 */
@Component({
	name: 'Column',
})
export default class Column extends Vue {

	/**
	 * A 12-grid style size
	 */
	@Prop({type: [Number, String], required: true})
	readonly size: string | number

}

</script>

<style lang="scss"></style>