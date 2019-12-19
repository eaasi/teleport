<template>
	<section id="edHistory">
		<div class="user-list padded">
			<table class="eaasi-table">
				<caption>
					Resource Details
				</caption>
				<thead>
					<tr>
						<th>
							Date
						</th>
						<th style="width: 900px;">
							Changes
						</th>
						<th>
							<!-- Details -->
						</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="rev in revisions" :key="rev.id">
						<td>
							N/A
						</td>
						<td>
							{{ rev.text | stripHtml }}
						</td>
						<td class="edrl-details-cell">
							<span class="edrl-details-heading" @click="fork(rev)">
								FORK
							</span>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</section>
</template>

<script lang="ts">
import {IEnvironmentRevision} from '@/types/Resource';
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { IEaasiSearchQuery } from '@/types/Search';

@Component({
	name: 'ResourceDetailsRevisionList',
})
export default class ResourceDetailsRevisionList extends Vue {

    /* Props
    ============================================*/
    @Prop({ required: true, type: Array })
    revisions?: IEnvironmentRevision[];

    /* Data
    ============================================*/
	expandedRows: any[] = [];

    /* Methods
    ============================================*/

	async fork(rev: IEnvironmentRevision) {
		const result = await this.$store.dispatch('resource/forkRevision', rev.id);
		if (!result) return;
		this.$router.push({ name: 'Explore Resources' });
	}

    toggle(id: string) {
    	const index = this.expandedRows.indexOf(id);
    	if (index > -1) {
    		this.expandedRows.splice(index, 1);
    	} else {
    		this.expandedRows.push(id);
    	}
    }
}

</script>

<style lang="scss">
.edrl-details-cell {
	align-content: center;
	text-align: center;

	.edrl-details-heading {
		border-radius: 0.5rem;
		color: $dark-blue;
		cursor: pointer;
		font-weight: bold;
		padding: 0.8rem 1.4rem;
		text-transform: uppercase;
		&:hover {
			background: #ffffff;
		}
	}
}
</style>
