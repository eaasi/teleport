<template>
	<div class="pill-toggle-container">
		<input
			type="checkbox"
			@change="handleChange"
			class="tgl tgl-flat"
			id="editMode"
		/>
		<label class="tgl-btn" for="editMode"></label>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component({
	name: 'TogglePill'
})
export default class TogglePill extends Vue {
	isChecked: boolean = false;

	handleChange() {
		this.isChecked = !this.isChecked;
		this.$emit('check', this.isChecked);
	}
};
</script>

<style lang="scss">
	.pill-toggle-container {
		color: $dark-blue;
	}

	.tgl {
		display: none;

		&,
		&::after,
		&::before,
		& *,
		& *::after,
		& *::before,
		& + .tgl-btn {
			box-sizing: border-box;

			&::selection {
				background: none;
			}
		}

		+ .tgl-btn {
			cursor: pointer;
			display: block;
			height: 32px;
			position: relative;
			width: 58px;

			&::after,
			&::before {
				content: '';
				display: block;
				height: 100%;
				position: relative;
				width: 50%;
			}

			&::after {
				left: 0;
			}

			&::before {
				display: none;
			}
		}

		&:checked + .tgl-btn::after {
			left: 50%;
		}
	}

	.tgl-flat {

		+ .tgl-btn {
			background: $dark-blue;
			border: 2px solid $dark-blue;
			border-radius: 20rem;
			padding: 2px;
			transition: all 0.2s ease;

			&::after {
				background: lighten($dark-blue, 30%);
				border-radius: 50%;
				box-sizing: border-box;
				transition: all 0.2s ease;
			}
		}

		&:checked + .tgl-btn {
			background: lighten($dark-blue, 50%);

			&::after {
				background: #FFFFFF;
				left: 50%;
			}
		}
	}
</style>
