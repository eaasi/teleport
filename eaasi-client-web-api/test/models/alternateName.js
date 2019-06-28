import { assert } from 'chai';
import alternateName from '../../src/data_access/models/alternateName';

import factories from '../factories';
import truncate from '../truncate';

describe('alternateName model', () => {
    let name = alternateName;

    beforeEach(async () => {
        await truncate();
        name = await factories.alternateName();
    });

    it('should generate an alternateName from the factory', async () => {
        assert.isOk(alternateName.alternateNameID);
    });
});