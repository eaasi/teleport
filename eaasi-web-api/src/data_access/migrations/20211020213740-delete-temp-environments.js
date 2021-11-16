'use strict';

const migration = require('./006-create-temp-environment.js');

module.exports = {
	up: migration.down,
	down: migration.up,
};
