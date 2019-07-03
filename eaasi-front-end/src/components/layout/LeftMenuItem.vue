<template functional>
	<router-link :to="props.item.route" class="left-menu-item" active-class="active">
		<div class="left-menu-icon">
			<i :class="`fa fa-${props.item.icon}`"></i>
		</div>
		<p class="small no-mb">
			{{ props.item.label }}
		</p>
	</router-link>
</template>

<script lang="ts">
import Vue from 'vue';;
import { IMenuItem } from '@/types/Navigation';
export default Vue.extend({
	name: 'LeftMenuItem',
	props: {
		item: {
			type: Object as () => IMenuItem,
			required: true
		}
	}
});
</script>

<style lang="scss">
.left-menu-item {
	color: #106393 !important;
	cursor: pointer;
	display: block;
	padding: 1.5rem 1rem;
	position: relative;
	text-align: center;
	text-decoration: none;
	user-select: none;

	i.fa {
		font-size: 4rem;
	}

	&::before {
		border-left: none;
		bottom: 0;
		content: '';
		display: block;
		left: 0;
		position: absolute;
		right: 0;
		top: 0;
		transition: background-color 0.3s, border-left 0.3s;
	}

	&.active {
		background-color: #fff;
		&::before {
			border-left: 4px solid #106393;
		}
	}
}

.left-menu-icon {
	height: 4.5rem;
}
</style>