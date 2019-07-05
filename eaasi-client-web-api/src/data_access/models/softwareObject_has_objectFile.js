'use strict';

import {File} from './file';
import {SoftwareObject} from './softwareObject';
import {MountFormat} from './mountFormat';

const Sequelize = require('sequelize');

class SoftwareObjectHasObjectFile extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE,
			softwareObject_softwareObjectID: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'softwareObject',
					key: 'softwareObjectID'
				}
			},
			softwareObjectFileID: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'file',
					key: 'fileID'
				}
			},
			softwareObjectFileLabel: {
				type: Sequelize.STRING,
				allowNull: true
			},
			softwareObjectFile_usesMountFormat: {
				type: Sequelize.STRING,
				allowNull: true,
				references: {
					model: 'mountFormat',
					key: 'mountFormatQID'
				}
			}
		}, { sequelize, tableName: 'softwareObject_has_objectFile' });
	};

	static associate(models) {
		SoftwareObjectHasObjectFile.hasOne(SoftwareObject, {foreignKey: 'softwareObjectID'});
		SoftwareObjectHasObjectFile.hasOne(File, {foreignKey: 'fileID'});
		SoftwareObjectHasObjectFile.hasOne(MountFormat, {foreignKey: 'mountFormatQID'});
	}
}

module.exports = {
	SoftwareObjectHasObjectFile: SoftwareObjectHasObjectFile
};
