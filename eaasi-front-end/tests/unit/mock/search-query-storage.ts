import { ISearchQueryStorage } from '@/types/Search';

export default class MockSearchQueryStorage implements ISearchQueryStorage {

    storage: string;

    constructor() {

    }

    getItem(key: string): string {
        return this.storage;
    }

    setItem(key: string, value: string) {
        this.storage = value;
    }

}