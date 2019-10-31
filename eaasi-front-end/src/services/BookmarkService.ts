import BaseHttpService from './BaseHttpService';
import { BookmarkRequest } from '@/types/Bookmark';
import config from '@/config';

class BookmarkService extends BaseHttpService {

    async createBookmark(bookmarkRequest: BookmarkRequest) {
        const res = await this.post(`${config.REST_API_URL}/bookmark`, bookmarkRequest);
        if (!res.ok) return null;
        return res.result;
    }

    async removeBookmark(id: number) {
        const res = await this.delete(`${config.REST_API_URL}/bookmark?id=${id}`);
        if (!res.ok) return null;
        return res.result;
    }

    async getBookmarks(userID: number) {
        const res = await this.get(`${config.REST_API_URL}/bookmark?userID=${userID}`);
        if (!res.ok) return null;
        return res.result;
    }
}

export default new BookmarkService();