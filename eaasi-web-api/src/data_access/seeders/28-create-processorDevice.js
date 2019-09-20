const data = require('../data/processorDevice');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('processorDevice', data);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('processorDevice', {}, {});
	}
};
