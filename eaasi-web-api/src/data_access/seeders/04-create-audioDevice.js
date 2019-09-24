const developer = require('../data/audiodevice');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('audioDevice', developer);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('audioDevice', {}, {});
	}
};
