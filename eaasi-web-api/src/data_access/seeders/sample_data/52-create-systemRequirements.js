const data = require('../../data/sample_data/systemRequirements');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('system_requirements', data);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('system_requirements', {}, {});
	}
};
