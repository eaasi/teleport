<template>
	<div id="loginScreen" class="flex-center">
		<div id="loginContent" class="flex-row flex-grow justify-between">
			<div id="loginTitle">
				<h1>EaaSI</h1>
				<h2>Emulation-as-a-Service-Infrastructure</h2>
			</div>
			<div id="loginBox">
				<h3>{{ nodeName }}</h3>
				<div>
					<!-- TODO: this should link to shibboleth SP -->
					<a :href="loginUrl">
						<ui-button>Login</ui-button>
					</a>
					<p v-if="!loginError">Using your approved access account.</p>
					<p class="error" v-if="loginError">{{ loginError }}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Get } from 'vuex-pathify';
import { Component } from 'vue-property-decorator';
import config from '@/config';
@Component({
	name: 'LoginScreen'
})
export default class LoginScreen extends Vue {

	/* Computed
	============================================*/

	@Get('nodeName')
	nodeName: string;

	@Get('loginError')
	loginError: string;


	/* Data
	============================================*/

	loginUrl: string = config.SERVICE_URL + '/auth/login';
}

</script>

<style lang="scss">
#loginScreen {
	background-color: #222222;
	background-image: url('../../assets/login-bg.png');
	background-size: cover;
	min-height: 100vh;
}

#loginTitle {
	color: #FFFFFF;
	text-align: center;

	h1 {
		font-size: 12rem;
	}

	h2 {
		font-size: 2rem;
		font-weight: 300;
	}
}

#loginContent {
	max-width: 900px;
}

#loginBox {
	background-color: #FFFFFF;
	flex: 0 1 40rem;

	h3 {
		background-color: $teal;
		color: #FFFFFF;
		font-weight: 300;
		padding: 3rem 1rem;
		text-align: center;
	}

	div {
		padding: 5rem 3rem;
		text-align: center;
	}

	p {
		margin: 2rem 0 0;
	}

	p.error {
		background-color: lighten($red, 90%);
		border: solid 1px $red;
		color: $red;
		padding: 1rem;
	}
}
</style>