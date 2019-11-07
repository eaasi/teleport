const data = require('../data/softwarelicense');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('software_license', data);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('software_license', {}, {});
	}
};
