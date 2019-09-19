const emulators = require('../data/emulators');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('emulator', emulators);
	},

	down: (queryInterface) => {
		queryInterface.sequelize.query('ALTER SEQUENCE "emulator_id_seq" RESTART WITH 1;');
		return queryInterface.bulkDelete('emulator', {}, {});
	}
};