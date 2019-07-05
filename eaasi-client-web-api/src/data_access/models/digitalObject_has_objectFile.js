'use strict';

import {DigitalObject} from './digitalObject';
import {File} from './file';
import {MountFormat} from './mountFormat';

const Sequelize = require('sequelize');

class DigitalObjectHasObjectFile extends Sequelize.Model {
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
			digitalObjectFileID: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'file',
					key: 'fileID'
				}
			},
			digitalObjectFileLabel: {
				type: Sequelize.STRING,
				allowNull: true
			},
			digitalObjectFile_usesMountFormat: {
				type: Sequelize.STRING,
				allowNull: true,
				references: {
					model: 'mountFormat',
					key: 'mountFormatQID'
				}
			}
		}, { sequelize, tableName: 'digitalObject_has_objectFile' });
	};

	static associate(models) {
		DigitalObjectHasObjectFile.hasOne(DigitalObject, {foreignKey: 'digitalObjectID'});
		DigitalObjectHasObjectFile.hasOne(File, {foreignKey: 'fileID'});
		DigitalObjectHasObjectFile.hasOne(MountFormat, {foreignKey: 'mountFormatQID'});
	}
}

module.exports = {
	DigitalObjectHasObjectFile: DigitalObjectHasObjectFile
};
