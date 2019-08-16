<template>
	<div>
		<div v-for="tag in tags" :key="tag.key" class="inline-block">
			<tag
				:icon="tag.icon"
				:text="tag.text"
				:color="tag.color"
			/>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import Tag from './Tag.vue';
import {ITag} from '@/types/Tag';

/**
 * A TagGroup provides a simple way to pass a list of `ITag` objects to a single component that renders a group of inline Tags.
 */
@Component({
	name: 'TagGroup',
	components: {
		Tag
	}
})
export default class TagGroup extends Vue {
    /* Props
    ============================================*/
    // Data required to display a
    @Prop({type: Array, required: true})
    tags: ITag[]
}

</script>
