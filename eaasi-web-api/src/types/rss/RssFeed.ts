import moment from 'moment';

/**
 * Represents a minimal RSS feed response
 * articleLinks: string href links to blog article
 * blogDescription: string description of the syndicated blog
 * blogTitle: string title fo the syndicated blog
 */
export class RssFeed {
	constructor(
		articleLinks: EaasiBlogArticleLink[],
		blogDescription: string,
		blogTitle: string
	) {
		this._buildRssFeed(articleLinks, blogDescription, blogTitle)
	}

	articleLinks: EaasiBlogArticleLink[];
	blogDescription: string;
	blogTitle: string;

	static empty() {
		return new RssFeed([], 'Saving Software Together', 'EaaSI Blog');
	}

	private _buildRssFeed(
		articleLinks: EaasiBlogArticleLink[],
		blogDescription: string,
		blogTitle: string
	) {
		this.articleLinks = articleLinks;
		this.blogDescription = blogDescription;
		this.blogTitle = blogTitle;
	}
}

/**
 * Represents a link to a Blog Article
 * article: JSON RSS response to be parsed
 */
export class EaasiBlogArticleLink {
	constructor(article: any) {
		this._buildArticleLink(article);
	}

	categories: string[];
	description: string;
	link: string;
	pubDate: string;
	title: string;

	private _buildArticleLink(article: any) {
		this.categories = article.category
		this.description = article.description[0]
		this.link = article.link[0]
		this.pubDate = moment(article.pubDate[0]).format('YYYY MMM DD')
		this.title = article.title[0]
	}
}
