export interface IBookmark {
    id: number;
    resourceID: string;
    userID: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface BookmarkRequest {
    resourceID: string;
    userID: number;
}

export interface MultiBookmarkRequest {
	resourceIDs: string[];
	userID: number;
}
