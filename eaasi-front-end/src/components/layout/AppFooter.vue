<template>
	<footer id="footer" class="flex-row">
		<div id="footerLogo">
			<div class="footer-logo">
				<img src="@/assets/eaasi_logos/logoEaaSI_160.png" alt="Eaasi Logo" />
			</div>
			<div class="footer-logo-label">
				{{ copyrightMessage }}
			</div>
		</div>

		<div id="footerLinks">
			<div class="footer-social">
				<div class="block">
					<a href="mailto:eaasi@yale.edu" id="eaasiEmail">
						<span class="fas fa-envelope-open eb-icon teal"></span>
						<span class="footer-item">
							eaasi@yale.edu
						</span>
					</a>
				</div>
				<div class="block">
					<a
						href="https://twitter.com/SoftPresNetwork"
						target="_blank"
						rel="noopener noreferrer"
					>
						<span class="fab fa-twitter eb-icon teal"></span>
						<span class="footer-item">
							@SoftPresNetwork
						</span>
					</a>
				</div>
				<div class="block">
					<span class="fas fa-globe eb-icon teal"></span>
					<span class="footer-item">
						<a
							href="https://www.eaasi.cloud"
							target="_blank"
							rel="noopener noreferrer"
						>
							https://www.eaasi.cloud
						</a>
					</span>
				</div>
			</div>
		</div>

		<div id="footerSponsors">
			<div class="footer-principal-container">
				<div class="footer-principal-label">
					Principal Partner
				</div>
				<img src="@/assets/yale-white_2x.png" alt="Yale University Logo" />
			</div>
			<div class="footer-sponsor-container">
				<div class="footer-sponsor-label block">
					Made Possible By
				</div>
				<div class="footer-sponsor-img inline-block">
					<img src="@/assets/andrew-w-mellon-white.png" class="md" alt="The Andrew W. Mellon Foundation logo" />
				</div>
				<div class="footer-sponsor-img inline-block sloan">
					<img src="@/assets/footerLogoSloan.png" class="lg" alt="The Alfred P. Sloan Foundation logo" />
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
	get copyrightMessage() {
		let now = new Date();
		const thisYear = now.getFullYear();
		return `© EaaSI ${thisYear}`;
	}
};
</script>

<style lang="scss">
	#footer {
		position: relative;
		background-color: darken($teal, 40%);
		height: $footerHeight;
		z-index: 300;
		bottom: 0;
	}

	#footerLogo {
		margin-bottom: 1.1rem;
		margin-left: 1rem;
		margin-right: 1.8rem;

		img {
			width: 8.5rem;
		}

		.footer-logo {
			border: 1rem solid darken($teal, 40%);
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

		.footer-social > div {
			font-size: 1.4rem;
			margin: 1rem 0;
		}

		.footer-social a {
			color: #FFFFFF;
			text-decoration: none;
		}

		.teal {
			color: lighten($teal, 30%);
		}

		.footer-item {
			color: lighten($teal, 80%);
			display: inline-block;
			padding-left: 1.4rem;
			text-decoration: underline;

			> a {
				color: lighten($teal, 80%);
			}
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
		color: lighten($teal, 60%);
		display: flex;
		flex-direction: row;
		font-size: 1.1rem;

		.footer-principal-container {
			border-right: 2px solid darken($dark-blue, 42%);
			padding: 0 1.4rem;

			.footer-principal-label {
				font-size: 1.1rem;
				margin-bottom: 3px;
			}

			img {
				height: 7rem;
				margin-top: 6px;
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

				.sm {
					height: 4.2rem;
				}

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
