<template>
	<div class="dh-container">
		<div class="dh-welcome flex-row">
			<div id="dh-eaasi-hexagon">
				<img src="@/assets/eaasi_logos/EaaSI_hexGraphic.png" alt="EaaSI Logo" />
			</div>
			<div id="dh-eaasi-welcome">
				<h3>Welcome to EaaSI</h3>
				<div class="dh-welcome-container">
					<div class="dh-welcome-overview">
						Overview
					</div>
					<div class="dh-welcome-subheading">
						Emulation-as-a-Service Infrastructure = EaaSI
					</div>
					<p class="dh-welcome-blurb">
						Led by the Digital Preservation Services team at Yale University Library,
						and with support from OpenSLX, DataCurrent, PortalMedia, Educopia, and
						the Software Preservation Network, the EaaSI program of work is focused on
						the development of technology and services to expand and scale the
						capabilities of the Emulation-as-a-Service software.
					</p>
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
margin: 0 1.2rem;
	#dh-eaasi-hexagon {
		margin: 0 1.2rem;
	}

	#dh-eaasi-welcome {
		padding: 2.4rem;
		max-width: 50rem;

		h3 {
			font-size: 3.4rem;
		}
	}

	.dh-welcome-container {
		padding: 1.2rem 0;

		.dh-welcome-overview {
			font-size: 2rem;
			font-weight: bold;
			margin-bottom: 1.2rem;
		}

		.dh-welcome-subheading {
			font-size: 1.8rem;
			font-weight: bold;
			margin-bottom: 1.2rem;
		}

		.dh-welcome-blurb {
			font-size: 1.6rem;
			line-height: 2.3rem;
		}
	}
}

.dh-quick-links {
	padding: 2rem 0 4rem 0;
	margin: 0 1.2rem;

	a {
		text-decoration: none;
	}

	> * {
		margin: 0 1.2rem;
	}
}
</style>