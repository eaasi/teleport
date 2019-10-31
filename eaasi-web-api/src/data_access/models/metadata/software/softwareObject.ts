'use strict';

const Sequelize = require('sequelize');

class SoftwareObject extends Sequelize.Model {}
module.exports = (sequelize) => {
	SoftwareObject.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		softwareObjectID: {
			type: Sequelize.STRING,
			allowNull: false,
			primaryKey: true,
		},
		softwareObject_inNetwork: {
			type: Sequelize.BOOLEAN,
			allowNull: false,
			defaultValue: false
		},
		softwareObject_hasSourceOrg: {
			type: Sequelize.INTEGER,
			allowNull: true
		},
		softwareObjectProductKey: {
			type: Sequelize.STRING,
			allowNull: true
		},
		softwareObjectHelpText: {
			type: Sequelize.TEXT,
			allowNull: true
		}
	}, { sequelize, tableName: 'softwareObject' });
	return SoftwareObject;
};
