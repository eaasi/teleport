import BaseHttpService from './BaseHttpService';
import { BookmarkRequest } from '@/types/Bookmark';

class BookmarkService extends BaseHttpService {

    async createBookmark(bookmarkRequest: BookmarkRequest) {
        const res = await this.post('http://localhost:8081/api/bookmark', bookmarkRequest);
        if (!res.ok) return null;
        return res.result;
    }

    async removeBookmark(id: number) {
        const res = await this.delete(`http://localhost:8081/api/bookmark?id=${id}`);
        if (!res.ok) return null;
        return res.result;
    }

    async getBookmarks(userID: number) {
        const res = await this.get(`http://localhost:8081/api/bookmark?userID=${userID}`);
        if (!res.ok) return null;
        return res.result;
    }
}

export default new BookmarkService();