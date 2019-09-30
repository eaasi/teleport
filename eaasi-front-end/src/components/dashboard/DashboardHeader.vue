<template>
	<div class="row">
		<div class="col-lg-12">
			<div class="dh-welcome">
				<div id="dh-eaasi-hexagon">
					<img src="@/assets/eaasi_logos/EaaSI_hexGraphic.png" alt="EaaSI Logo"/>
				</div>
				<div id="dh-eaasi-welcome-text">
					<h3>Welcome to EaaSI</h3>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit.
						In lobortis placerat quam, nec sodales metus pellentesque vitae.
						Proin lacinia congue est, nec blandit tortor convallis sed. Praesent semper
						non urna id dapibus. In lobortis placerat quam, nec sodales pellentesque vitae.
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
	name: 'DashboardHeader'
})
export default class DashboardHeader extends Vue {
}
</script>

<style lang="scss">
	.dh-welcome {
		display: flex;
		flex-direction: row;

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
</style>