<template>
	<div class="home padded">
		<h1>My Dashboard</h1>
		<button @click="showModal">Create Environment</button>
		<create-base-env-modal v-if="isModalOpen" @close="closeModal" />
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CreateBaseEnvModal from '@/components/base-environment/CreateBaseEnvModal.vue';

@Component({
	components: {CreateBaseEnvModal}
})
export default class Home extends Vue {
	isModalOpen = false;

	showModal() {
		this.isModalOpen = true;
	}

	closeModal() {
		this.isModalOpen = false;
	}
}
</script>

<style>
.home {
	padding: 2rem;
}
</style>