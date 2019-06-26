/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {softwareObjectFile_has_objectFileOperationInstance, softwareObjectFile_has_objectFileOperationAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<softwareObjectFile_has_objectFileOperationInstance, softwareObjectFile_has_objectFileOperationAttribute>('softwareObjectFile_has_objectFileOperation', {
    softwareObjectFile_softwareObjectID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'softwareObject_has_objectFile',
        key: 'softwareObjectFileID'
      }
    },
    softwareObjectFile_fileID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    softwareObjectFile_operationID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    softwareObjectFile_operationOrder: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'softwareObjectFile_has_objectFileOperation'
  });
};
