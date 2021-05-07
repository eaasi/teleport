export interface IBookmark {
    id: number;
    resourceId: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface BookmarkRequest {
    resourceId: string;
    userId: string;
}

export interface MultiBookmarkRequest {
	resourceIds: string[];
	userId: string;
}
