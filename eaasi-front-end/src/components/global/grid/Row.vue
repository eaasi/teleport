<template functional>
	<div class="row">
		<slot></slot>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component({
	name: 'Row',
})
export default class Row extends Vue {}

</script>

<style lang="scss"></style>