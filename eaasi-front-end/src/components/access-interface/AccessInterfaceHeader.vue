<template>
	<div id="accessHeader">
		<div class="ah-top flex align-center">
			<div class="ah-logo">
				<img src="@/assets/header-logo.png" alt="Eaasi Logo" />
			</div>
			<div>
				<ui-button size="sm" icon="times" @click="$emit('click:exit')">
					Exit Emulation
				</ui-button>
				<ui-button size="sm" @click="$emit('click:restart')">
					Restart Emulation
				</ui-button>
				<ui-button size="sm" disabled @click="$emit('click:save')">
					Save Environment
				</ui-button>
			</div>
			<div class="ah-alert flex-row" v-if="emulatorIsRunning">
				<i class="far fa-exclamation-triangle"></i>
				<span class="ah-warning-message">Emulated computer must be shut down before saving.</span>
			</div>
		</div>
		<div class="ah-options">
			<!-- TODO -->
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { Get } from 'vuex-pathify';

@Component({
	name: 'AccessInterfaceHeader',
})
export default class AccessInterfaceHeader extends Vue {

	/* Computed
	============================================*/

	@Get('emulatorIsRunning')
	readonly emulatorIsRunning: boolean;

}

</script>

<style lang="scss">
#accessHeader {
	background-color: lighten($teal, 60%);
	left: 0;
	position: fixed;
	right: 0;
	top: 0;
	z-index: 2;

	.eaasi-button {
		margin-right: 2rem;
	}

	.ah-warning-message {
		font-size: 1.5rem;
	}
}

.ah-top,
.ah-options {
	padding-left: 14rem;
}

.ah-top {
	height: $accessHeaderHeight - 4rem;
	position: relative;
}

.ah-options {
	background-color: $teal;
	height: 4rem;
}

.ah-logo {
	background-color: darken($teal, 50%);
	border: solid 6px darken($teal, 50%);
	border-radius: 50%;
	left: 1rem;
	position: absolute;
	top: 0.3rem;
}

.ah-alert {
	i {
		color: darken($orange, 12%);
		font-size: 2.5rem;
		margin-right: 1rem;
	}
}
</style>