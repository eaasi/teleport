'use strict';

import {OsVersion} from './osVersion';

const Sequelize = require('sequelize');

class OsVersionHasAlternateID extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE,
			osVersion_osVersionID: {
				type: Sequelize.INTEGER,
				allowNull: true,
				references: {
					model: 'osVersion',
					key: 'osVersionID'
				}
			},
			osVersion_alternativeID: {
				type: Sequelize.STRING,
				allowNull: false
			}
		}, { sequelize, tableName: 'osVersion_has_alternateID' });
	};

	static associate(models) {
		OsVersionHasAlternateID.hasOne(OsVersion, {foreignKey: 'osVersionID'});
	}
};

module.exports = {
	OsVersionHasAlternateID: OsVersionHasAlternateID
};
