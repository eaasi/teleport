<template>
	<div class="dh-container">
		<div class="dh-welcome flex-row">
			<div id="dh-eaasi-hexagon">
				<!--suppress HtmlUnknownTarget -->
				<img src="@/assets/eaasi_logos/EAASI-windows-4-green.png" alt="EaaSI Logo" />
			</div>
			<div id="dh-eaasi-welcome">
				<h1>Welcome!</h1>
				<div class="dh-welcome-container">
					<p class="dh-welcome-subheading">
						Emulation-as-a-Service Infrastructure = EaaSI
						<br />
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
			<a href="https://sandbox.eaasi.cloud" target="_blank" rel="noopener noreferrer">
				<big-button
					sub-label="Open source software sandbox with access to EaaSI service."
					icon="box"
					label="Sandbox Demo"
				/>
			</a>

			<a href="https://eaasi.gitlab.io/eaasi_user_handbook/" target="_blank" rel="noopener noreferrer">
				<big-button
					sub-label="Learning guides, training resources, and user support."
					icon="graduation-cap"
					label="Get Help"
				/>
			</a>

			<a href="https://forum.eaasi.cloud" target="_blank" rel="noopener noreferrer">
				<big-button
					sub-label="Connect to other users for community and collaboration."
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
		img {
			margin: 20px 10px 10px 0;
			max-width: 250px;
		}
	}

	h1 {
		color: #000000;
		font-weight: 600;
	}

	#dh-eaasi-welcome {
		max-width: 50rem;
		padding: 2.4rem;

		h3 {
			font-size: 3.4rem;
		}
	}

	.dh-welcome-container {
		padding: 1.2rem 0;

		.dh-welcome-blurb {
			font-size: 1.6rem;
			line-height: 2.3rem;
		}
	}
}

.dh-quick-links {
	margin: 0 1.2rem;
	padding: 2rem 0 4rem 0;

	a {
		text-decoration: none;
	}

	> * {
		margin: 0 1.2rem;
	}
}
</style>