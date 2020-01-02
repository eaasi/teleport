<template>
	<modal 
		@close="$emit('close')"
		@click:cancel="$emit('close')"
	>
		<template #header>
			<h3>Download Print Jobs</h3>
			<p>Click on the filename to download.</p>
		</template>
		<div class="flex flex-column">
			<a 
				v-for="label in printJobLabels" 
				:key="label" 
				@click="printJob(label)" 
				class="job-label-link"
			>
				{{ label }}
			</a>
		</div>
	</modal>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component({
    name: 'PrintJobsModal'
})
export default class PrintJobsModal extends Vue {

    /* Props
    ============================================*/
    @Prop({ type: Array as () => String[] })
    printJobLabels: string[];

    /* Methods
    ============================================*/
    printJob(label: string) {
        return this.$emit('download-print-job', label);
    }

}
</script>

<style lang='scss' scoped>
p {
	color: lighten($grey, 20%);
	margin-top: 1rem;
}
.job-label-link {
	cursor: pointer;
	padding-bottom: 1rem;
}
</style>