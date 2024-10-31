<template>
	<div class="log-in-page">
		<div class="left-part">
			<h1>Reviving histories,<br /> ensuring access</h1>
			<large-button label="Log In" />
		</div>
		<div class="right-part">
			<img src="@/assets/EAASI-windows-group-black.png" alt="group of Eaasi windows image" class="windows-large-group" />
			<img src="@/assets/EAASI-windows-5-black.png" alt="Eaasi windows image" class="windows-footer" />
			<img src="@/assets/eaasi_logos/eaasi-logo-transparent-background.png" alt="Eaasi Logo" class="eaasi-logo-log-in" />
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

@Component({
	name: 'LoginPage'
})
export default class LoginScreen extends Vue {

	@Prop({ type: String, required: true })
	readonly loginUrl: string;
}

</script>

<style lang="scss">
.log-in-page {
	display: flex;
	height: 100%;

	.left-part {
		width: 70%;
		background-color: $white;
		display: flex;
		justify-content: start;
		flex-direction: column;
		align-items: center;
		padding: 20px;
		margin-top: 60px;

		h1 {
			font-weight: 600;
			margin: 40px 0;
			font-size: 3.3rem;
		}

		.eaasi-large-button {
			min-width: 100px;
			padding: 20px;
			text-align: center;

			label {
				font-size: 2.0rem;
			}
		}
	}

	.right-part {
		width: 30%;
		background-color: $green;
		display: flex;
		justify-content: end;
		flex-direction: column;
		position: relative;

		.windows-large-group {
			width: 327px;
			position: absolute;
			top: 15%;
			left: -27%;
		}

		.windows-footer {
			position: absolute;
			width: 130px;
			top: 35%;
			left: 30%;
		}

		.eaasi-logo-log-in {
			width: 150px;
			position: absolute;
			bottom: 0;
			right: 0;
		}

	}
}
</style>