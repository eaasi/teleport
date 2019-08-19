<template>
	<div>
		<div class="tag-section">
			<tag text="HELLO" />
			<tag color="yellow" text="HELLO" />
			<tag color="blue" text="HELLO" />
			<tag color="red" text="HELLO" />
			<tag color="green" text="HELLO" />
		</div>
		<div class="tag-section">
			<tag icon="fa-star" text="HELLO" />
			<tag icon="fa-chess" color="yellow" text="HELLO" />
			<tag icon="fa-feather" color="blue" text="HELLO" />
			<tag icon="fa-moon" color="red" text="HELLO" />
			<tag icon="fa-om" color="green" text="HELLO" />
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Tag from '../global/Tag.vue';
	@Component({
		components: {Tag}
	})
export default class TagsTest extends Vue {
}
</script>

<style lang="scss">
	.tag-section {
		padding: 12px;
	}
</style>
