<template>
	<div>
		<small-bookmark />
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SmallBookmark from '../../components/global/SmallBookmark.vue';
	@Component({
		components: {SmallBookmark}
	})
export default class SmallBookmarkTest extends Vue {}
</script>

<style lang="scss">
</style>
