import {IEaasiResource} from '@/types/Resource';
import { make } from 'vuex-pathify';
import _svc from '@/services/BookmarkService';
import { Store } from 'vuex';
import {IBookmark, BookmarkRequest, MultiBookmarkRequest} from '@/types/Bookmark';

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

    async getBookmarks({ commit }: Store<BookmarkStore>, userID: number) {
        const result = await _svc.getBookmarks(userID);
        if (!result) return;
        commit('SET_BOOKMARKS', result);
    },

    async clearBookmarks({ commit }: Store<BookmarkStore>, userID: number) {
        const result = await _svc.clearBookmarks(userID);
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
    	const userId = bookmarksRequest.userID;
    	const resourceIds = bookmarksRequest.resourceIDs;
    	resourceIds.map(id => {
    		if (!state.bookmarks.find(bm => bm.resourceID === id)) {
    			dispatch('createBookmark', { userID: userId, resourceID: id});
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
