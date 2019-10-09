let faker = require('faker');

/**
 * Generates Fake EaaSI Blog Article Links for Test
 */
export function generateFakeEaasiArticle() {
	return {
		categories: [faker.hacker.noun(), faker.hacker.ingverb()],
		description: [faker.name.jobTitle(), faker.name.findName()],
		link: [faker.internet.url()],
		pubDate: [faker.date.recent()],
		title: [[faker.name.findName(),  faker.hacker.verb(), faker.hacker.adjective(), faker.hacker.noun()].join(' ')]
	}
}

/**
 * Rss Parser Test Fake
 */
export class RssParserFake {

	rssResponse;

	getBlogArticles(numberOfArticles) {
		let articles = [];

		for (let i = 0; i < numberOfArticles; i++) {
			articles.push(generateFakeEaasiArticle())
		}

		return articles;
	}

	getBlogDescription() {
		return 'Lorem ipsum';
	}

	getBlogTitle() {
		return 'Test Title';
	}

	setRssToParse(rss) {
		this.rssResponse = rss;
	}
}
