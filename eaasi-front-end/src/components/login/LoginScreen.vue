<template>
	<div id="loginScreen" class="flex-center">
		<div id="loginContent" class="flex-row flex-grow justify-between">
			<div id="loginTitle">
				<img src="@/assets/eaasi_logos/eaasi_logo_dark_bg.png" id="logo" alt="EaaSI logo" />
				<h2>Test Emulation-as-a-Service-Infrastructure</h2>
			</div>
			<div id="loginBox">
				<h3>{{ nodeName }}</h3>
				<single-sign-on-login-box v-if="isSamlAuthEnabled" :login-url="loginUrl" />
				<email-password-login-box v-else :login-url="loginUrl" />
				<div>
					<p v-if="!loginError" class="text-center">Test Using your approved access account.</p>
					<p class="error text-center" v-if="loginError">{{ loginError }}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Get } from 'vuex-pathify';
import { Component } from 'vue-property-decorator';
import SingleSignOnLoginBox from './SingleSignOnLoginBox.vue';
import EmailPasswordLoginBox from './EmailPasswordLoginBox.vue';
import config from '@/config';

@Component({
	name: 'LoginScreen',
	components: {
		SingleSignOnLoginBox,
		EmailPasswordLoginBox
	}
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
	isSamlAuthEnabled: boolean = config.SAML_ENABLED;

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
	width: 720px;

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

	#logo {
		margin: 3rem;
		width: 60%;
	}
}

#loginBox {
	background-color: #FFFFFF;
	flex: 0 1 40rem;

	h3 {
		background-color: $green;
		color: #FFFFFF;
		font-weight: 300;
		padding: 3rem 1rem;
		text-align: center;
	}

	p {
		padding: 3rem 1rem;
	}

	p.error {
		background-color: lighten($red, 90%);
		border: solid 1px $red;
		color: $red;
		padding: 1rem;
	}
}

</style>