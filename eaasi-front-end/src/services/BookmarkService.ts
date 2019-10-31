import BaseHttpService from './BaseHttpService';
import { BookmarkRequest, IBookmark } from '@/types/Bookmark';
import config from '@/config';

class BookmarkService extends BaseHttpService {

    async createBookmark(bookmarkRequest: BookmarkRequest): Promise<IBookmark> {
        const res = await this.post<IBookmark>(`${config.REST_API_URL}/bookmark`, bookmarkRequest);
        if (!res.ok) return null;
        return res.result;
    }

    async removeBookmark(id: number): Promise<IBookmark> {
        const res = await this.delete<IBookmark>(`${config.REST_API_URL}/bookmark?id=${id}`);
        if (!res.ok) return null;
        return res.result;
    }

    async getBookmarks(userID: number): Promise<IBookmark> {
        const res = await this.get<IBookmark>(`${config.REST_API_URL}/bookmark?userID=${userID}`);
        if (!res.ok) return null;
        return res.result;
    }

    async clearBookmarks(userID: number) {
        const res = await this.delete<IBookmark>(`${config.REST_API_URL}/bookmark/all?userID=${userID}`);
        console.log(res);
        if (!res.ok) return null;
        return res.result;
    }

}

export default new BookmarkService();