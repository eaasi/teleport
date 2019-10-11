<template>
	<div class="dh-container">
		<div class="dh-welcome flex-row">
			<div id="dh-eaasi-hexagon">
				<img src="@/assets/eaasi_logos/EaaSI_hexGraphic.png" alt="EaaSI Logo" />
			</div>
			<div id="dh-eaasi-welcome-text">
				<h3>Welcome to EaaSI</h3>
				<div class="dh-welcome-content">
				</div>
			</div>
		</div>
		<div class="dh-quick-links flex-row">
			<a href="https://www.softwarepreservationnetwork.org/eaasi-sandbox/" target="_blank">
				<big-button
					sub-label="Open source software sandbox with access to EaaSI service."
					icon="box"
					label="Sandbox Demo"
				/>
			</a>

			<a href="https://eaasi.gitlab.io/eaasi_user_handbook/" target="_blank">
				<big-button
					sub-label="User guides, training resources, and support for EaaSI users."
					icon="graduation-cap"
					label="Learn and Support"
				/>
			</a>

			<a href="https://groups.google.com/forum/#!forum/eaasi-tech-talk" target="_blank">
				<big-button
					sub-label="Connect to other EaaSI users for support and collaboration."
					icon="comments"
					label="User Forum"
				/>
			</a>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
	name: 'DashboardHeader'
})
export default class DashboardHeader extends Vue { }
</script>

<style lang="scss">
.dh-welcome {

	#dh-eaasi-hexagon {
		margin: 0 1.2rem;
	}

	#dh-eaasi-welcome-text {
		padding: 24px;
		width: 20vw;

		h3 {
			font-size: 2.4rem;
		}

		> p {
			font-size: 1.6rem;
			line-height: 3.2rem;
		}
	}
}

.dh-quick-links {
	padding: 2rem 0 4rem 0;

	a {
		text-decoration: none;
	}

	> * {
		margin: 0 1.2rem;
	}
}
</style>