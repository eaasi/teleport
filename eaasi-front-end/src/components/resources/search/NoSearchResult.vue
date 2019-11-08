<template>
    <div class="nr-wrapper">
        <div class="nr-container">
            <h2>No Result</h2>
            <p>Sorry, there are no results matching your search
            <br>"{{ query.keyword }}"</p>
            <p>Don’t give up! Try a new search or you can…</p>
            <div class="flex flex-row">
                <ui-button size="md" secondary>
					Browse Your Node
				</ui-button>
                <ui-button size="md" secondary style="margin-left: 3rem;" @click="clearSearch">
					Browse All Resources
				</ui-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import ResourceSearchQuery from '@/models/search/ResourceSearchQuery';
import { Component, Prop, Watch } from 'vue-property-decorator';
import { Sync } from 'vuex-pathify';

@Component({
    name: 'NoSearchResult'
})
export default class  extends Vue {

    /* Computed
    ============================================*/

    @Sync('resource/query')
    query: ResourceSearchQuery;

    /* Methods
    ============================================*/
    async clearSearch() {
        this.query = new ResourceSearchQuery();
        await this.$store.dispatch('resource/searchResources');
    }

}
</script>

<style lang='scss' scoped>
.nr-wrapper {
    margin: 2rem;
    h2, p {
        margin-bottom: 2.4rem;
    }
    .nr-container {
        padding: 4rem;
        max-width: 50rem;
        min-height: 30rem;
    }
}
</style>