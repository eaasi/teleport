const data = require('../data/audiodevice');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('audioDevice', data);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('audioDevice', {}, {});
	}
};
