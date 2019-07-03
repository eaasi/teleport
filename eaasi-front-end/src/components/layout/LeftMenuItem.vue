/* eslint-disable vue/require-default-prop */
<template>
	<router-link :to="item.link" class="left-menu-item" active-class="active">
		<div class="left-menu-icon">
			<i :class="`fa fa-${item.icon}`" />
		</div>
		<p class="left-menu-label">
			{{ item.label }}
		</p>
	</router-link>
</template>

<script lang="ts">
import Vue from 'vue';;
import MenuItem from '../../Navigation';
export default Vue.extend({
	name: 'LeftMenuItem',
	props: {
		item: {
			type: Object as () => MenuItem,
			required: true
		}
	},
	computed: {

	},
	data() {
		return {

		};
	},
	methods: {

	}
});
</script>

<style lang="scss">
.left-menu-item {
	color: #106393 !important;
	cursor: pointer;
	display: block;
	text-align: center;
	padding: 1.5rem 1rem;
	position: relative;
	text-decoration: none;
	user-select: none;
	i.fa {
		font-size: 4rem;
	}
	p {
		font-size: 1.2rem;
		line-height: 1.5rem;
		margin-bottom: 0;
	}
	&:before {
		content: '';
		display: block;
		position: absolute;
		top: 0; right: 0; bottom: 0; left: 0;
		border-left: 0px solid #FFF;
		transition: background-color 0.3s, border-left 0.3s;
	}
	&.active {
		background-color: #FFF;
		&:before {
			border-left: 4px solid #106393;
		}
	}
}
.left-menu-icon {
	height: 4.5rem;
}
</style>