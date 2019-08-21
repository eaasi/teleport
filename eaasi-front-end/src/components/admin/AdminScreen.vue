<template>
	<div class=""></div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component({
	name: 'AdminScreen'
})
export default class AdminScreen extends Vue {

	// TODO: Add computed properties for role / permissions

	/* Lifecycle Hooks
	============================================*/

	beforeCreate() {
		this.$store.commit('global/SET_ADMIN_MENU_OPEN', true);
	}

	beforeDestroy() {
		this.$store.commit('global/SET_ADMIN_MENU_OPEN', false);
	}

}

</script>

<style lang="scss"></style>