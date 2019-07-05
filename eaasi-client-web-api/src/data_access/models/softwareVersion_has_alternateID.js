'use strict';

import {SoftwareVersion} from './softwareVersion';

const Sequelize = require('sequelize');

class SoftwareVersionHasAlternateID extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE,
			softwareVersion_softwareVersionID: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'softwareVersion',
					key: 'softwareVersionID'
				}
			},
			softwareVersion_alternateID: {
				type: Sequelize.STRING,
				allowNull: false
			}
		}, { sequelize, tableName: 'softwareVersion_has_alternateID' });
	};

	static associate(models) {
		SoftwareVersionHasAlternateID.hasOne(SoftwareVersion, {foreignKey: 'softwareVersionID'});
	}
}

module.exports = {
	SoftwareVersionHasAlternateID: SoftwareVersionHasAlternateID
};
