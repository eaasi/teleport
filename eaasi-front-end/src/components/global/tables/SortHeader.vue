<template>
	<th :class="['sort-header', {sorted}]" @click="sort">
		<slot></slot>
		<span class="sh-arrow">
			<i :class="`fas fa-fw fa-${icon}`"></i>
		</span>
	</th>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { IEaasiSearchQuery } from 'eaasi-http';
import { jsonCopy } from '@/utils/functions';

/**
 * A clickable table header for sorting table columns
 * @example ../../docs/SortHeader.Example.md
 */
@Component({
	name: 'SortHeader',
})
export default class SortHeader extends Vue {

	/* Props
	============================================*/

	/**
	 * The name of the Sequelize model property to sort on
	 */
	@Prop({type: String, required: true})
	readonly sortCol: string

	/**
	 * The search query containing the current sort rule
	 */
	@Prop({type: Object, required: true})
	readonly query: IEaasiSearchQuery

	/* Computed
	============================================*/

	get icon() {
		if(this.query.descending) return 'chevron-down';
		return 'chevron-up';
	}

	get sorted() {
		return this.sortCol === this.query.sortCol;
	}

	/* Methods
	============================================*/

	sort() {
		let query = jsonCopy<IEaasiSearchQuery>(this.query);
		if(this.sortCol === query.sortCol) {
			query.descending = !query.descending;
		} else {
			query.descending = false;
			query.page = 1;
		}
		query.sortCol = this.sortCol;
		this.$emit('sort', query);
	}

}

</script>

<style lang="scss">
.sort-header {
	cursor: pointer;
	user-select: none;

	.sh-arrow {
		color: $light-blue;
		visibility: hidden;
	}

	&.sorted {

		.sh-arrow {
			visibility: visible;
		}
	}
}
</style>