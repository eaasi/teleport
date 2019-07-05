'use strict';

import {DigitalObject} from './digitalObject';

const Sequelize = require('sequelize');

class DigitalObjectHasAlternativeID extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE,
			digitalObject_digitalObjectID: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'digitalObject',
					key: 'digitalObjectID'
				}
			},
			alternativeID_alternativeID: {
				type: Sequelize.STRING,
				allowNull: true
			}
		}, { sequelize, tableName: 'digitalObject_has_alternativeID' });
	};

	static associate(models) {
		DigitalObjectHasAlternativeID.hasOne(DigitalObject, {foreignKey: 'digitalObjectID'});
	}
}

module.exports = {
	DigitalObjectHasAlternativeID: DigitalObjectHasAlternativeID
};
