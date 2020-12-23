<template>
	<div class="eaasi-icon-container">
		{{ translatedIcon }}
	</div>
</template>

<script lang="ts">
	import Vue from 'vue';
	import { Component, Prop } from 'vue-property-decorator';

	@Component({
		name: 'EaasiIcon'
	})
	export default class EaasiIcon extends Vue {
		@Prop({ type: String, required: true })
		icon: string;

		get translatedIcon() {
			switch (this.icon) {
				case 'paperclip':
					return '';
				case 'bookmark':
					return '';
				case 'file-container':
					return '';
				case 'home':
					return '';
				case 'trash':
					return '';
				case 'file':
					return '';
				case 'atom':
					return '';
				case 'config-environment':
					return '';
				case 'file-search':
					return '';
				case 'upload':
					return '';
				case 'lock':
					return '';
				case 'clipboard-list':
					return '';
				case 'manage':
					return '';
				case 'cloud-upload':
					return '';
				case 'public-network':
					return '';
				case 'power':
					return '';
				case 'map-marker':
                    return '';
				case 'cloud-download':
				    return '';
				case 'disk':
                    return '';
				case 'unlock':
					return '';
				default:
					return 'X';
			}
		}
	};
</script>

<style lang="scss">
	@font-face {
		font-family: EaasiIcon;
		src: url('../../../assets/iconsEaaSI.ttf') format('truetype');
	}

	.eaasi-icon-container {
		font-family: EaasiIcon, fantasy;
	}
</style>