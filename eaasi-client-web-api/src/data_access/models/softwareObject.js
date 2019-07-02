'use strict';

const Sequelize = require('sequelize');

class SoftwareObject extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
			softwareObjectID: {
				type: Sequelize.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
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
	};

	static associate(models) {
	}
};

module.exports = {
	SoftwareObject : SoftwareObject
};
