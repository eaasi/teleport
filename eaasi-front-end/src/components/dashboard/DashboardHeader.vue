<template>
	<div class="dh-container">
		<div class="dh-welcome flex-row">
			<div id="dh-eaasi-hexagon">
				<!--suppress HtmlUnknownTarget -->
				<img src="@/assets/eaasi_logos/EAASI-windows-4-green.png" alt="EaaSI Dashboard Logo" />
			</div>
			<div id="dh-eaasi-welcome">
				<h1>Welcome to EAASI,</h1>
				<div class="dh-welcome-container">
					<p class="dh-welcome-subheading">
						an emulation platform that makes it easier to access digital
						collections for research, teaching, and creativity.
					</p>
				</div>
			</div>
		</div>
		<div class="dh-quick-links">
			<a href="https://sandbox.eaasi.cloud" target="_blank" rel="noopener noreferrer">
				<big-button
					sub-label="Open source software sandbox with access to EaaSI service."
					icon="box"
					label="Sandbox Demo"
				/>
			</a>

			<a href="https://eaasi-user-handbook.readthedocs-hosted.com/_/sharing/EOs8D598cw5xmC213l7QJdAiZsyOejes?next=/en/latest/" target="_blank" rel="noopener noreferrer">
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
	margin: 10px 40px;
	#dh-eaasi-hexagon {
		margin: 0 1.2rem;
		img {
			margin: 20px 10px 10px 0;
			max-width: 250px;
		}
	}

	h1 {
		color: #000000;
		font: $font-heading;
		font-weight: 800;

	}

	#dh-eaasi-welcome {
		width: -webkit-fill-available;
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
	margin: 10px 40px;
	padding: 2rem 0 4rem 0;
	display: flex;
	flex-direction: row;
	gap: 40px;

	a {
		text-decoration: none;
		align-items: stretch;
		height: auto;
	}
}

@media screen and (max-width: 950px) {
	.dh-welcome {
		#dh-eaasi-hexagon {
			img {
				max-width: 150px;
				margin: 0;
			}
		}
	}

	.dh-quick-links {
		flex-wrap: wrap;
		gap: 20px;

		a {
			width: -webkit-fill-available;

			.eaasi-big-button-with-subtext {
				width: -webkit-fill-available;
			}
		}
	}
}
</style>