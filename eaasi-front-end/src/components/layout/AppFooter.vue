<template>
	<footer id="footer" class="flex-row">
		<div id="footerLogo">
			<div class="footer-logo">
				<img src="@/assets/eaasi_logos/eaasi-logo-transparent-background.png" alt="Eaasi footer Logo" />
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
							#eaasi
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
							id="eaasi-website"
						>
							https://www.eaasi.cloud
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
		background-color: $green;
		bottom: 0;
		height: $footerHeight;
		position: relative;
		z-index: 300;
		color: $black;
	}

	#footerLogo {
		margin-bottom: 0.5rem;
		margin-left: 0.3rem;
		margin-right: 1.8rem;

		img {
			width: 150px;
		}

		.footer-logo {
			display: block;
		}

		.footer-logo-label {
			color: $black;
			display: block;
			font-size: 1.2rem;
			text-align: center;
			position: absolute;
			bottom: 25px;
			left: 37px;
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
