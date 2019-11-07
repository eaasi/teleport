const developer = require('../../data/audiodevice');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('audio_device', developer);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('audio_device', {}, {});
	}
};
