<template>
	<div class="home padded">
		<h1>My Dashboard</h1>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BigButton from '@/components/global/BigButton.vue';

@Component({
	components: {BigButton}
})
export default class Home extends Vue { }
</script>

<style>
.home {
	padding: 2rem;
}
</style>