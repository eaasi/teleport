<template>
	<div class="resource-details">
		<resource-detail
			name="Description"
			value="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In lobortis placerat quam, nec sodales metus pellentesque vitae. Proin lacinia congue est, nec blandit tortor convallis sed. Praesent semper non urna id dapibus."
		/>
		<resource-detail
			name="Operating System Name"
			value=".iso"
		/>
		<resource-detail
			name="Language"
			value=".iso"
		/>
		<resource-detail
			name="User Information"
			value=".iso"
		/>
		<resource-detail
			name="Hardware Template Name"
			value=".iso"
		/>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { IEaasiResource } from '@/types/Resource';
import ResourceDetail from './ResourceDetail.vue';

// TODO: The content in this component should become dynamic based on resource
@Component({
	name: 'ResourceDetails',
	components: {
		ResourceDetail
	}
})
export default class ResourceDetails extends Vue {

	@Prop({type: Object as () => IEaasiResource, required: true})
	readonly resource: IEaasiResource

}

</script>

<style lang="scss"></style>