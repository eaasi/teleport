<template>
	<div class="">
		<emulator v-if="environment" />
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Get } from 'vuex-pathify';
import { Component, Prop } from 'vue-property-decorator';
import Emulator from './Emulator.vue';
import { IEnvironment } from '../../types/Resource';

@Component({
	name: 'AccessInterfaceScreen',
	components: {
		Emulator
	}
})
export default class AccessInterfaceScreen extends Vue {

	/* Props
	============================================*/

	/* Data
	============================================*/

	/* Computed
	============================================*/

	@Get('resource/activeEnvironment')
	readonly environment: IEnvironment

	/* Methods
	============================================*/

	/* Lifecycle Hooks
	============================================*/

	/* Watchers
	============================================*/

}

</script>

<style lang="scss"></style>