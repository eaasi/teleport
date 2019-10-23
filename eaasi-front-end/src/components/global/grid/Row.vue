<template functional>
	<div class="row">
		<slot></slot>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

/**
 * A thin functional wrapper around a div with class `row`
 */
@Component({
	name: 'Row',
})
export default class Row extends Vue {}

</script>

<style lang="scss"></style>