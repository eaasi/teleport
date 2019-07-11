const {UserInformation} = require('../../../../src/data_access/models/index');

describe('models/userInformation', () => {
	it('Should have table name `userInformation`', () => {
		expect(UserInformation.tableName).toEqual('userInformation')
	})
})
