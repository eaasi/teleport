import { make } from 'vuex-pathify';
import _svc from '@/services/BookmarkService';
import { Store } from 'vuex';
import { IBookmark, BookmarkRequest } from '@/types/Bookmark';

/*============================================================
 == State
/============================================================*/
class BookmarkStore {
    // array of resource ids that are bookmarked by current user
    bookmarks: IBookmark[] = [];
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

    async createBookmark({ state, commit }: Store<BookmarkStore>, bookmarkRequest: BookmarkRequest) {
        const result = await _svc.createBookmark(bookmarkRequest);
        if (!result) return;
        const updatedBookmarks = [...state.bookmarks, result];
        commit('SET_BOOKMARKS', updatedBookmarks);
    },

    async removeBookmark({ state, commit }: Store<BookmarkStore>, bookmarkRequest: BookmarkRequest) {
        const { id } = state.bookmarks.find(b => b.resourceID === bookmarkRequest.resourceID);
        if (!id) return;
        await _svc.removeBookmark(id);
        const updatedBookmarks = state.bookmarks.filter(
            b => b.resourceID !== bookmarkRequest.resourceID
        );
        commit('SET_BOOKMARKS', updatedBookmarks);
    },

    async getBookmarks({ commit }:Store<BookmarkStore>, userID: number) {
        const result = await _svc.getBookmarks(userID);
        if (!result) return;
        commit('SET_BOOKMARKS', result);
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
