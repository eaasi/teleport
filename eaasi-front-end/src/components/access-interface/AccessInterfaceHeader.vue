<template>
	<div id="accessHeader">
		<div class="ai-top flex align-center">
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
		</div>
		<div class="ai-options">

		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component({
	name: 'AccessInterfaceHeader',
})
export default class AccessInterfaceHeader extends Vue {

	/* Props
	============================================*/

	/* Data
	============================================*/

	/* Computed
	============================================*/

	/* Methods
	============================================*/

	/* Lifecycle Hooks
	============================================*/

	/* Watchers
	============================================*/

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
}

.ai-top,
.ai-options {
	padding-left: 14rem;
}

.ai-top {
	height: $accessHeaderHeight - 4rem;
	position: relative;
}

.ai-options {
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
</style>