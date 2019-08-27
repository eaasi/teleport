<template>
	<div class="home padded">
		<h1>My Dashboard</h1>
		<button @click="throwErr">Error</button>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
	components: {}
})
export default class Home extends Vue {
	throwErr() {
		x = 1;
	}
}
</script>

<style>
.home {
	padding: 2rem;
}
</style>