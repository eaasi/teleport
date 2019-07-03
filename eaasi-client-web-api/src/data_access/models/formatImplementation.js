'use strict';

import {FileExtension} from './fileExtension';

const Sequelize = require('sequelize');

class FormatImplementation extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE,
			formatImplementationID: {
				type: Sequelize.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},
			formatImplementationName: {
				type: Sequelize.STRING,
				allowNull: false
			},
			implementationExtension: {
				type: Sequelize.INTEGER,
				allowNull: true,
				references: {
					model: 'fileExtension',
					key: 'fileExtensionID'
				}
			}
		}, { sequelize, tableName: 'formatImplementation' });
	};

	static associate(models) {
		FormatImplementation.hasOne(FileExtension, {foreignKey: 'fileExtensionID'});
	}
}

module.exports = {
	FormatImplementation: FormatImplementation
};
