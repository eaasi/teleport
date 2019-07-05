'use strict';

import {SoftwareVersion} from './softwareVersion';
import {FormatImplementation} from './formatImplementation';
import {FormatOperation} from './formatOperation';

const Sequelize = require('sequelize');

class SoftwareVersionHasFormatImplementation extends Sequelize.Model {
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
			softwareVersion_formatImplementationID: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'formatImplementation',
					key: 'formatImplementationID'
				}
			},
			softwareVersion_implementationOperation: {
				type: Sequelize.INTEGER,
				allowNull: true,
				references: {
					model: 'formatOperation',
					key: 'operationID'
				}
			},
			defaultImplementation: {
				type: Sequelize.BOOLEAN,
				allowNull: true
			}
		}, { sequelize, tableName: 'pointerDevice' });
	};

	static associate(models) {
		SoftwareVersionHasFormatImplementation.hasOne(SoftwareVersion, {foreignKey: 'softwareVersionID'});
		SoftwareVersionHasFormatImplementation.hasOne(FormatImplementation, {foreignKey: 'formatImplementationID'});
		SoftwareVersionHasFormatImplementation.hasOne(FormatOperation, {foreignKey: 'formatOperationID'});
	}
}

module.exports = {
	SoftwareVersionHasFormatImplementation : SoftwareVersionHasFormatImplementation
};
