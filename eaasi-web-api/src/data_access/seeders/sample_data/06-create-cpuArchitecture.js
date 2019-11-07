const cpuArch = require('../../data/cpuArchitecture');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('cpu_architecture', cpuArch);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('cpu_architecture', {}, {});
	}
};
