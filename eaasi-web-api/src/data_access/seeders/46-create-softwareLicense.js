const data = require('../data/softwarelicense');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('softwareLicense', data);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('softwareLicense', {}, {});
	}
};
