import {BlogArticleLink} from '@/types/rss/RssFeed';

export default interface RssParser {
	rssResponse: any;
	setRssToParse(rss: any): void;
	getBlogTitle(): string;
	getBlogDescription(): string;
	getBlogArticles(numberOfArticles: number): BlogArticleLink[];
}
