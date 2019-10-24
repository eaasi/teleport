import CrudService from '../base/CrudService';

const { Bookmark } = require('@/data_access/models');

/**
 * Handles CRUD operations for Bookmarks
 */
export default class EaasiBookmarkService extends CrudService {
    constructor() {
        super(Bookmark)
    }
}
