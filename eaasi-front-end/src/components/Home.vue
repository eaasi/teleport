<template>
	<div class="home">
		<all-components></all-components>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AllComponents from "../components/sandbox/AllComponents";

@Component({
	components: {AllComponents}
})
export default class Home extends Vue { }
</script>

<style>
.home {
	padding: 2rem;
}
</style>