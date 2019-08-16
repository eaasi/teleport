<template>
	<div>
		<div class="subsection">
			<h4>
				Section Heading
			</h4>
			<hr />
			<section-heading title="Operating System" icon="fa-flower" />
			<section-heading title="Configured Machine" icon="fa-file" />
			<section-heading title="Emulator" icon="fa-cloud" />
		</div>
		<hr />
		<div class="subsection">
			<h4>
				Big Section Heading
			</h4>
			<hr />
			<big-section-heading title="Operating System" />
			<big-section-heading title="Configured Machine" />
			<big-section-heading title="Emulator" />
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SectionHeading from '../global/SectionHeading.vue';
import BigSectionHeading from '../global/BigSectionHeading.vue';
	@Component({
		components: {SectionHeading, BigSectionHeading}
	})
export default class SectionHeadingTest extends Vue {
}
</script>

<style lang="scss">
	.subsection {
		padding-top: 3rem;
	}
</style>
