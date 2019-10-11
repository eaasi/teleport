<template functional>
	<div :class="`col-xs-${props.size}`">
		<slot></slot>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component({
	name: 'Column',
})
export default class Column extends Vue {

	@Prop({type: [Number, String], required: true})
	readonly size: string | number

}

</script>

<style lang="scss"></style>