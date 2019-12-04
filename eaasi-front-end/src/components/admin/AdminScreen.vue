<template>
	<div class=""></div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import Vue from 'vue';

@Component({
	name: 'AdminScreen'
})
export default class AdminScreen extends Vue {

	// TODO: Add computed properties for role / permissions

	/* Lifecycle Hooks
	============================================*/

	mounted() {
		this.$store.commit('SET_ADMIN_MENU_OPEN', true);
	}

	beforeDestroy() {
		this.$store.commit('SET_ADMIN_MENU_OPEN', false);
	}

}

</script>

<style lang="scss"></style>