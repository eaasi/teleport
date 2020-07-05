export interface IBookmark {
    id: number;
    resourceID: string;
    userId: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface BookmarkRequest {
    resourceID: string;
    userId: number;
}

export interface MultiBookmarkRequest {
	resourceIDs: string[];
	userId: number;
}
