import { IResourceSearchQuery, ISearchQueryStorage } from '@/types/Search';

export default class SearchQueryService {

    private readonly SEARCH_QUERY_KEY = 'EAASI_SEARCH_QUERY';
    private readonly source: QuerySource;
    private readonly queryStorage: ISearchQueryStorage;
    
    constructor(
        source: QuerySource, 
        queryStorage: ISearchQueryStorage = localStorage
    ) {
        this.source = source;
        this.queryStorage = queryStorage;
    }
    
    persistQuery(query: IResourceSearchQuery): boolean {
        try {
            if (!query) throw new Error('query can not be null');
            const queryString = JSON.stringify(query);
            this.queryStorage.setItem(this.getKey(), queryString);
            return true;
        } catch(err) {
            console.warn(err);
            return false;
        }
    }
    
    retrieveQuery(): IResourceSearchQuery {
        try {
            const queryString = this.queryStorage.getItem(this.getKey());
            return JSON.parse(queryString) as IResourceSearchQuery;
        } catch(err) {
            console.warn(err);
            return null;
        }
    }

    private getKey(): string {
        return `${this.SEARCH_QUERY_KEY}:${this.source}`;
    }

}

export enum QuerySource {
    ExploreResources = 'EXPLORE_RESOURCES',
    MyBookmarks = 'MY_BOOKMARKS',
    ImportedResources = 'IMPORTED_RESOURCES'
}