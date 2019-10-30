import BaseHttpService from "./BaseHttpService";

class BookmarkService extends BaseHttpService {

    async createBookmark(resourceID: string) {
        const res = await this.post('http://localhost:8081/api/bookmark', { resourceID, userID: 2 });
        if (!res.ok) return null;
        return res.result;
    }

    async removeBookmark(resourceID: string) {
        const res = await this.post('/', { resourceID });
        if (!res.ok) return null;
        return res.result;
    }

    async getBookmarks(userID: number) {
        const res = await this.get(`http://localhost:8081/api/bookmark?userID=${userID}`);
        console.log(res);
        if (!res.ok) return null;
        return res.result;
    }
}

export default new BookmarkService();