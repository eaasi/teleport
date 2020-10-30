import SearchQueryService, { QuerySource } from '@/services/SearchQueryService';
import { IResourceSearchQuery } from '@/types/Search';
import MockSearchQueryStorage from '../mock/search-query-storage';


describe('SearchQueryService', () => {

    describe('persistQuery', () => {
        
        it('should persist query successfully', () => {
            const query: IResourceSearchQuery = {...mockQuery, keyword: 'foo' };
            const mockStorage = new MockSearchQueryStorage();
            const sut = new SearchQueryService(QuerySource.ExploreResources, mockStorage);
            const persistResult = sut.persistQuery(query);
            
            expect(persistResult).toEqual(true);
            expect(mockStorage.storage).toStrictEqual(JSON.stringify(query));
        });

        it('should fail to persist query', () => {
            const mockStorage = new MockSearchQueryStorage();
            const sut = new SearchQueryService(QuerySource.ExploreResources, mockStorage);
            const persistResult = sut.persistQuery(null);
            
            expect(persistResult).toEqual(false);
        });

    });

    describe('retrieveQuery', () => {
        
        it('should retrieve query successfully', () => {
            const query: IResourceSearchQuery = {...mockQuery, keyword: 'foo' };
            const queryString = JSON.stringify(query);
            const mockStorage = new MockSearchQueryStorage();
            const svc = new SearchQueryService(QuerySource.ExploreResources, mockStorage);
            mockStorage.storage = queryString;

            const sut = svc.retrieveQuery();
            
            expect(sut).toStrictEqual(query);
        });

        it('should fail to retrieve query', () => {
            const mockStorage = new MockSearchQueryStorage();
            const svc = new SearchQueryService(QuerySource.ExploreResources, mockStorage);

            const sut = svc.retrieveQuery();
            
            expect(sut).toEqual(null);
        });

    });



});

const mockQuery: IResourceSearchQuery = {
    selectedFacets: [],
	types: [],
	keyword: '',
	archives: [],
	limit: 0,
	page: 0
};