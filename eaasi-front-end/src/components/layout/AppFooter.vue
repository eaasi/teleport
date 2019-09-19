<template functional>
	<footer id="footer" class="flex-row">

		<div id="footerLogo">
			<div class="footer-logo">
				<img src="../../assets/header-logo.png" alt="Eaasi Logo" />
			</div>
			<div class="footer-logo-label">
				&copy; EaaSI 2019
			</div>
		</div>

		<div id="footerLinks">
			<div class="footer-social">
				<div class="inline-block">
					<a href="mailto:eaasi@yale.edu" id="eaasiEmail">
						<i class="fas fa-envelope-open eb-icon teal"></i>
						<span class="footer-email">
							eaasi@yale.edu
						</span>
					</a>
				</div>

				<div class="inline-block social-link">
					<i class="fab fa-instagram eb-icon"></i>
				</div>

				<div class="inline-block social-link">
					<i class="fab fa-twitter eb-icon"></i>
				</div>

				<div class="inline-block social-link">
					<i class="fab fa-facebook-f eb-icon"></i>
				</div>
			</div>

			<div class="footer-website">
				<a
					href="http://www.softwarepreservationnetwork.org/eaasi"
					target="_blank"
				>
					www.softwarepreservationnetwork.org/eaasi
				</a>
			</div>
		</div>

		<div id="footerSponsors">
			<div class="footer-principal-container">
				<div class="footer-principal-label">
					Principal Partner:
				</div>
				<img src="../../assets/yale-white.png" />
			</div>
			<div class="footer-sponsor-container">
				<div class="footer-sponsor-label block">
					Made Possible By
				</div>
				<div class="footer-sponsor-img inline-block">
					<img src="../../assets/andrew-w-mellon-white.png" class="md" />
				</div>
				<div class="footer-sponsor-img inline-block">
					<img src="../../assets/sloan-logo-primary-white.png" class="lg" />
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
export default class AppFooter extends Vue {
};
</script>

<style lang="scss">
	#footer {
		background-color: darken($teal, 40%);
		height: $footerHeight;
	}

	#footerLogo {
		margin-left: 2.5rem;
		margin-top: -4rem;

		img {
			width: 8.5rem;
		}

		.footer-logo {
			border: 2rem solid darken($teal, 40%);
			border-radius: 50%;
			display: block;
		}

		.footer-logo-label {
			color: lighten($teal, 60%);
			display: block;
			font-size: 1.2rem;
			text-align: center;
		}
	}

	#footerLinks {
		color: #FFFFFF;
		margin-right: 6rem;

		.footer-social a {
			color: #FFFFFF;
			text-decoration: none;
		}

		.teal {
			color: $teal;
		}

		.footer-email {
			display: inline-block;
			padding-left: 1.4rem;
		}

		.footer-website {
			padding: 1.4rem 0;
		}

		.footer-website a {
			color: #FFFFFF;
			text-decoration: none;
		}

		.social-link {
			padding-left: 2rem;
		}
	}

	#footerSponsors {
		color: #FFFFFF;
		display: flex;
		flex-direction: row;
		font-size: 1.2rem;

		.footer-principal-container {
			border-right: 2px solid darken($dark-blue, 42%);
			padding: 0 1.4rem;

			.footer-principal-label {
				font-size: 1.1rem;
			}

			img {
				height: 7rem;
			}
		}

		.footer-sponsor-container {
			padding-left: 2.8rem;

			.footer-sponsor-label {
				font-size: 1.1rem;
			}

			.footer-sponsor-img {
				margin-right: 2.4rem;
				vertical-align: middle;

				.md {
					height: 5.4rem;
				}

				.lg {
					height: 8.4rem;
				}
			}
		}
	}
</style>
