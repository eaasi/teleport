'use strict';

import {SoftwareObject} from './softwareObject';

const Sequelize = require('sequelize');

class SoftwareObjectHasAlternateID extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE,
			softwareObject_softwareObjectID: {
				type: Sequelize.INTEGER,
				allowNull: true,
				references: {
					model: 'softwareObject',
					key: 'softwareObjectID'
				}
			},
			softwareObject_alternateID: {
				type: Sequelize.STRING,
				allowNull: true
			}
		}, { sequelize, tableName: 'softwareObjectHasAlternateID' });
	};

	static associate(models) {
		SoftwareObjectHasAlternateID.hasOne(SoftwareObject, {foreignKey: 'softwareObjectID'});
	}
}

module.exports = {
	SoftwareObjectHasAlternateID: SoftwareObjectHasAlternateID
};
