<template>
	<div>
		<div class="flex flex-row justify-between">
			<h4 class="medium">
				{{ label }}
			</h4>
			<slot name="action"></slot>
		</div>
		<div class="drive-card flex">
			<slot></slot>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import { IDrive, IEaasiResource, IResourceDrive } from '../../../types/Resource';
import { resourceTypes } from '@/utils/constants';
import ContentResourceCard from '@/components/resources/ContentResourceCard.vue';
import SoftwareResourceCard from '@/components/resources/SoftwareResourceCard.vue';

@Component({
	name: 'DriveCard',
	components: {
		ContentResourceCard,
		SoftwareResourceCard,
	}
})
export default class DriveCard extends Vue {

	/* Props
	============================================*/
	@Prop({ type: String, required: true })
	readonly label: string;

}
</script>

<style lang='scss'>
.drive-card {
	border: 2px solid $dark-green;
	border-radius: 1rem;
	margin-bottom: 1.5rem;
	padding: 1.5rem;
}
</style>