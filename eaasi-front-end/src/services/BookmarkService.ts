import BaseHttpService from "./BaseHttpService";

class BookmarkService extends BaseHttpService {
    async createBookmark(resourceID: string) {
        const res = await this.post('http://localhost:8081/api/bookmark', { resourceID });
        if (!res.ok) return null;
        return res.result;
    }

    async removeBookmark(resourceID: string) {
        const res = await this.post('/removeBookmark', { resourceID });
        if (!res.ok) return null;
        return res.result;
    }
}

export default new BookmarkService();