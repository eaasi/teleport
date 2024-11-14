<template>
	<footer id="footer" class="flex-row">
		<div id="footerLogo">
			<div class="footer-logo">
				<img src="@/assets/eaasi_logos/eaasi-logo-transparent-background.png" alt="Eaasi footer Logo" />
			</div>
		</div>

		<div id="footerLinks">
			<div class="footer-social">
				<div class="block">
					<span class="fas fa-globe eb-icon teal"></span>
					<span class="footer-item">
						<a
							href="https://forum.eaasi.cloud"
							target="_blank"
							rel="noopener noreferrer"
							id="eaasi-website"
						>
							https://forum.eaasi.cloud
						</a>
					</span>
				</div>
			</div>
		</div>
	</footer>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';


@Component({
	name: 'AppFooter',
})
export default class AppFooter extends Vue {};

</script>

<style lang="scss">
	#footer {
		background-color: $green;
		bottom: 0;
		height: $footerHeight;
		position: relative;
		z-index: 300;
		color: $black;
		flex: 0;
	}

	#footerLogo {
		margin-left: 0.3rem;
		margin-right: 1.8rem;

		img {
			width: 150px;
		}

		.footer-logo {
			display: block;
		}
	}

	#footerLinks {
		color: #FFFFFF;
		margin-right: 6rem;

		.footer-social > div {
			font-size: 1.4rem;
			margin: 1rem 0;
		}

		.footer-social a {
			color: #FFFFFF;
			text-decoration: none;
		}

		.teal {
			color: $black;
		}

		.footer-item {
			color: $black;
			display: inline-block;
			padding-left: 1.4rem;
			text-decoration: none;

			> a {
				color: $black;

				&:hover {
					color: $dark-light-grey;
				}
			}

			&:hover {
				color: $dark-light-grey;
			}
		}

		.footer-website {
			padding: 1.4rem 0;
		}

		.footer-website a {
			color: $black;
			text-decoration: none;
		}

		.social-link {
			padding-left: 2rem;
		}
	}
</style>
