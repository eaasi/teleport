<template>
	<info-modal
		v-if="isOpen"
		@close="$emit('close')"
		size="large"
		title="Create Base Environment"
	>
		<div>
		</div>
	</info-modal>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { Modal, UiButton } from '@/components/global';
import InfoModal from '@/components/global/Modal/InfoModal.vue';

@Component({
	name: 'CreateBaseEnvModal',
	components: {
		InfoModal,
		UiButton
	}
})
export default class CreateBaseEnvModal extends Vue {
	isOpen = true;
}

</script>

<style lang="scss">
</style>
