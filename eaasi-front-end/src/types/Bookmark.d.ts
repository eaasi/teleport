export interface IBookmark {
    id: number;
    resourceId: string;
    userId: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface BookmarkRequest {
    resourceId: string;
    userId: number;
}

export interface MultiBookmarkRequest {
	resourceIds: string[];
	userId: number;
}
