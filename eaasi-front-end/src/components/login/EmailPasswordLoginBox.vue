<template>
	<div class="auth-wrapper">
		<eaasi-form>
			<div class="auth-group">
				<text-input
					rules="required"
					v-model.trim="email"
					placeholder="Please enter your email"
					type="email"
					label="Email"
				/>
			</div>
			<div class="auth-group">
				<text-input
					rules="required"
					v-model.trim="password"
					placeholder="Please enter your password"
					type="password"
					label="Password"
				/>
			</div>
			<div class="auth-group text-center">
				<ui-button @click="authenticate">
					Submit
				</ui-button>
			</div>
		</eaasi-form>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import { ILoginRequest } from '../../types/Auth';
import { Sync } from 'vuex-pathify';
import formValidator from '../../utils/form-validator';

@Component({
    name: 'PerformLoginScreen'
})
export default class PerformLoginScreen extends Vue {

    /* Props
    ============================================*/
    @Prop({ type: String, required: true })
    readonly loginUrl: string;

    /* Computed
	============================================*/
	@Sync('loginError')
	loginError: string;

    /* Data
    ============================================*/
    email: string = '';
	password: string = '';

    /* Methods
    ============================================*/

    async authenticate() {
		this.loginError = null;
		const validationErr = this.validateFields();
		if (validationErr != null) {
			this.loginError = validationErr;
			return;
		}
        // validate email and password
        const loginRequest: ILoginRequest = {
            email: this.email,
            password: this.password
        };
		const success = await this.$store.dispatch('login', loginRequest);
		if (success) {
			this.$router.push({ 'name': 'Dashboard' });
		} else {
			this.loginError = 'Invalid credentials';
		}
	}

	validateFields(): string {
		const { email, password } = this;
		if (email == '' || password == '' || password.length < 8) {
			return 'Please enter your email and password';
		}
		const emailErr = formValidator.validate('email', email, 'email');
		if (emailErr != null) return emailErr;
		return null;
	}

    /* Lifecycle Hooks
    ============================================*/

}
</script>

<style lang='scss' scoped>
	.auth-wrapper {
		padding: 2rem;
	}
	.auth-group {
		margin-top: 1rem;
	}
</style>