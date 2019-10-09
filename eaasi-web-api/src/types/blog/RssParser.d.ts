export default interface RssParser {
	rssResponse: any;
	setRssToParse(rss: any): void;
	getBlogTitle(): string;
	getBlogDescription(): string;
	getBlogArticles(numberOfArticles: number): any[];
}
