import { make } from 'vuex-pathify';

import _svc from '@/services/BookmarkService';
import { Store } from 'vuex';

/*============================================================
 == State
/============================================================*/
class BookmarkStore {
    // array of resource ids that are bookmarked by current user
    bookmarks: Array<string> = [];
}

const state = new BookmarkStore();

/*============================================================
 == Mutations
/============================================================*/

const mutations = make.mutations(state);

/*============================================================
 == Actions
/============================================================*/

const actions = {

    async createBookmark(_: Store<BookmarkStore>, resourceID: string) {
        return await _svc.createBookmark(resourceID);
    },

    async removeBookmark(_: Store<BookmarkStore>, resourceID: string) {
        return await _svc.removeBookmark(resourceID);
    }

};

/*============================================================
 == Getters
/============================================================*/

const getters = {};

export default {
	state,
	mutations,
	actions,
	getters,
	namespaced: true
};
