import config from '@/config';
import { BookmarkRequest, IBookmark } from '@/types/Bookmark';
import BaseHttpService from './BaseHttpService';

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

    async getBookmarks(userId: number): Promise<IBookmark> {
        const res = await this.get<IBookmark>(`${config.REST_API_URL}/bookmark?userId=${userId}`);
        if (!res.ok) return null;
        return res.result;
    }

    async clearBookmarks(userId: number) {
        const res = await this.delete<IBookmark>(`${config.REST_API_URL}/bookmark/all?userId=${userId}`);
        if (!res.ok) return null;
        return res.result;
    }

}

export default new BookmarkService();