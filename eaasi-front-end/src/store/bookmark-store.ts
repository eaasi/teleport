import _svc from '@/services/BookmarkService';
import { BookmarkRequest, IBookmark, MultiBookmarkRequest } from '@/types/Bookmark';
import { Store } from 'vuex';
import { make } from 'vuex-pathify';

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
        const bookmarks = state.bookmarks ?? [];
        if (!result) return;
        const updatedBookmarks = [...bookmarks, result];
        commit('SET_BOOKMARKS', updatedBookmarks);
    },

    async removeBookmark({ state, commit }: Store<BookmarkStore>, bookmarkRequest: BookmarkRequest) {
        const { id } = state.bookmarks.find(b => b.resourceId === bookmarkRequest.resourceId);
        if (!id) return;
        await _svc.removeBookmark(id);
        const updatedBookmarks = state.bookmarks.filter(
            b => b.resourceId !== bookmarkRequest.resourceId
        );
        commit('SET_BOOKMARKS', updatedBookmarks);
    },

    async getBookmarks({ commit }: Store<BookmarkStore>, userId: string) {
        const result = await _svc.getBookmarks(userId);
        if (!result) return;
        commit('SET_BOOKMARKS', result);
    },

    async clearBookmarks({ commit }: Store<BookmarkStore>, userId: string) {
        const result = await _svc.clearBookmarks(userId);
        if (!result) return;
        commit('SET_BOOKMARKS', []);
    },

	/**
	 * // TODO: Update API endpoint to accept a post request with a list of bookmarks
	 * Bookmarks many resourceIDs
	 * @param state
	 * @param dispatch
	 * @param bookmarksRequest
	 */
	async bookmarkMany({ state, dispatch }: Store<BookmarkStore>, bookmarksRequest: MultiBookmarkRequest) {
    	const userId = bookmarksRequest.userId;
    	const resourceIds = bookmarksRequest.resourceIds;
    	resourceIds.forEach(id => {
    		if (!state.bookmarks.find(bm => bm.resourceId === id)) {
                const payload: BookmarkRequest = { userId, resourceId: id };
    			dispatch('createBookmark', payload);
			}
		});
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
