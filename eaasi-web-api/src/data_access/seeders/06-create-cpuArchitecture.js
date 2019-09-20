const cpuArch = require('../data/cpuArchitecture');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('cpuArchitecture', cpuArch);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('cpuArchitecture', {}, {});
	}
};
