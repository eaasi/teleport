'use strict';

const migration = require('./005-create-emulator.js');

module.exports = {
	up: migration.down,
	down: migration.up,
};
