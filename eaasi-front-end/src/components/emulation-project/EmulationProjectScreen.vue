<template>
	<div>
		<view-header title="Emulation Project" />
		<div>
			<section-heading title="Base Environment" />
		</div>
		<div>
			<section-heading title="Software Resources" />
		</div>
		<div>
			<section-heading title="Content Resources" />
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator';
import Vue from 'vue';

@Component({
	name: 'EmulationProjectScreen'
})
export default class EmulationProjectScreen extends Vue {

	/* Lifecycle Hooks
	============================================*/

	mounted() {
	}

	beforeDestroy() {
	}

}

</script>

<style lang="scss"></style>
