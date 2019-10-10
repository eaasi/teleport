/**
 * Represents a minimal RSS feed response
 * articleLinks: string href links to blog article
 * blogDescription: string description of the syndicated blog
 * blogTitle: string title fo the syndicated blog
 */
export interface IRssFeed {
	articleLinks: IBlogArticleLink[];
	blogDescription: string;
	blogTitle: string;
}

/**
 * Represents a link to a Blog Article
 * article: JSON RSS response to be parsed
 */
export interface IBlogArticleLink {
	categories: string[];
	description: string;
	link: string;
	pubDate: string;
	title: string;
}

