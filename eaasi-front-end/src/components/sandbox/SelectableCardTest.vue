<template>
	<div>
		<div class="row">
			<div class="col">
				<div v-for="resource in resources" :key="resource.id">
					<selectable-card :data="resource" :bookmark="true" :footer="true">
						<template v-slot:tagsLeft>
							<tag-group position="left" :tags="tagGroupData1" />
						</template>
						<template v-slot:tagsRight>
							<tag-group position="right" :tags="tagGroupData2" />
						</template>
					</selectable-card>
				</div>
			</div>
			<div class="col">
				<div v-for="resource in revResources" :key="resource.id">
					<selectable-card :data="resource" :bookmark="false" :footer="true">
						<template v-slot:tagsLeft>
							<tag-group position="left" :tags="tagGroupData1" />
						</template>
						<template v-slot:tagsRight>
                            <tag-group position="right" :tags="tagGroupData2" />
						</template>
					</selectable-card>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SelectableCard from '../global/SelectableCard/SelectableCard.vue';
import TagGroup from '../global/TagGroup.vue';
@Component({
	components: {SelectableCard, TagGroup}
})
export default class ResourceCardTest extends Vue {

	// Mock Data for displaying different configurations
	tagGroupData1 = [
		{ icon: 'fa-file', text: 'CONTENT ENVIRONMENT' }
	]

	tagGroupData2 = [
		{ icon: 'fa-cloud', text: 'Foo', color: 'yellow' },
		{ icon: 'fa-check', text: 'SAVED', color: 'yellow' },
	]


	resources = [
		{
			id: 1,
			title: 'My Computer',
			content: {
				OS: 'Windows XP',
				Software: 'Adobe Photoshop',
				Version:  '19.31.2',
			},
			subContent: {
				Something: 'Else here',
				Date: '09/10/2019',
			},
		},
		{
			id: 2,
			title: 'Another Resource With No Tags',
			content: {
				OS: 'Windows XP',
				Software: 'Adobe Photoshop',
				Version:  '19.31.2',
			},
			subContent: {
				Location: 'Madison',
				Date: '09/10/2019',
			},
		},
		{
			id: 3,
			title: 'A Big Resource With A Lot Of Data',
			content: {
				OS: 'Windows XP',
				Software: 'Microsoft Word, Microsoft Excel',
				Version:  '19.31.2',
				Display: 'Some Monitor',
				'Sound Device': 'Some Sound Card',
				'Graphics Card': 'Some Graphics Card',
				Mouse: 'Yes',
				Keyboard: 'QWERTY',
				Other: 'Miscellaneous Data',
			},
			subContent: {
				Something: 'Else here',
				Date: '09/10/2019',
			},
		},
		{
			id: 4,
			title: 'This One Has Only Content',
			content: {
				OS: 'Windows Vista',
				Software: 'Napster',
				Version:  '7.1',
			},
		},
		{
			id: 5,
			title: 'Another Resource',
			content: {
				OS: 'Windows XP',
				Software: 'Microsoft Word, Microsoft Excel',
				Version:  '19.31.2',
				Display: 'Some Monitor',
				Foo:  '19.31.2',
				Bar: 'Some Monitor',
				Baz:  '19.31.2',
				Quux: 'Some Monitor',
			},
			subContent: {
				Foo: 'Bar',
				Baz: 'Quux',
				Date: '09/10/2019',
			},
		},
	]

	revResources = this.resources.slice().reverse()
}
</script>

<style>
	.row {
		padding: 12px;
		display: flex;
		flex-direction: row;
	}

	.col {
		display: flex;
		flex-direction: column;
		padding: 12px;
	}
</style>
