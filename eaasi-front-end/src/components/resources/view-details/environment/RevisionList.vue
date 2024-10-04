<template>
	<section id="edHistory">
		<div class="user-list padded">
			<table class="eaasi-table">
				<caption>
					Resource Details
				</caption>
				<thead>
					<tr>
						<th id="dateCol" style="min-width: 10ch;">
							Date
						</th>
						<th id="timeCol" style="min-width: 8ch;">
							Time
						</th>
						<th id="changedCol" style="width: 100%;">
							Changes
						</th>
						<th id="detailsCol">
							<!-- Details -->
						</th>
					</tr>
				</thead>
				<tbody>
					<tr v-if="description">
						<td>
							{{ toDateString(timestamp) }}
						</td>
						<td>
							{{ toTimeString(timestamp) }}
						</td>
						<td>
							{{ description | stripHtml }}
						</td>
						<td class="edrl-details-cell">
							<span class="edrl-details-heading disabled">
								FORK
							</span>
						</td>
					</tr>
					<tr v-for="rev in revisions" :key="rev.id">
						<td>
							{{ toDateString(rev.timestamp) }}
						</td>
						<td>
							{{ toTimeString(rev.timestamp) }}
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
import { ROUTES } from '@/router/routes.const';
import { INotification } from '@/types/Notification';
import { generateId } from '@/utils/functions';
import eventBus from '@/utils/event-bus';

@Component({
	name: 'ResourceDetailsRevisionList',
})
export default class ResourceDetailsRevisionList extends Vue {

    /* Props
    ============================================*/
    @Prop({ required: true, type: Array })
    revisions?: IEnvironmentRevision[];

    @Prop({ required: false, type: String })
	description?: string;

	@Prop({ required: false, type: String })
	timestamp?: string;

    /* Data
    ============================================*/
	expandedRows: any[] = [];

    /* Methods
    ============================================*/

	async fork(rev: IEnvironmentRevision) {
		const result = await this.$store.dispatch('resource/forkRevision', rev.id);
		if (!result) return;
		if (result.status === '0') {
			await this.$router.push({ path: ROUTES.RESOURCES.ENVIRONMENT, query: { resourceId: result.envId.toString() } });
			this.$emit('full-refresh');
		} else {
			let notification: INotification = {
				label: `Failed to fork environment: ${result.message}`,
				time: 5000,
				type: 'danger',
				id: generateId()
			};
			eventBus.$emit('notification:show', notification);
		}
	}

    toggle(id: string) {
    	const index = this.expandedRows.indexOf(id);
    	if (index > -1) {
    		this.expandedRows.splice(index, 1);
    	} else {
    		this.expandedRows.push(id);
    	}
    }

	private getTimestampSubstring(ts: string, start: number, end: number): string {
		// NOTE: timestamp is expected to be in ISO-8601 format!
		if (ts == null || ts.length < end)
			return 'N/A';

		return ts.substring(start, end);
	}

	toDateString(ts: string): string {
		return this.getTimestampSubstring(ts, 0, 10);
	}

	toTimeString(ts: string): string {
		return this.getTimestampSubstring(ts, 11, 19);
	}
}

</script>

<style lang="scss">
.edrl-details-cell {
	align-content: center;
	text-align: center;

	.edrl-details-heading {
		border-radius: 0.5rem;
		color: $dark-green;
		cursor: pointer;
		font-weight: bold;
		padding: 0.8rem 1.4rem;
		text-transform: uppercase;
		&:hover {
			background: #ffffff;
		}

		&.disabled {
			background: transparent;
			color: #808080;
			cursor: not-allowed;
		}
	}
}
</style>
