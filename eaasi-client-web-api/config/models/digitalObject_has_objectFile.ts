/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {digitalObject_has_objectFileInstance, digitalObject_has_objectFileAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<digitalObject_has_objectFileInstance, digitalObject_has_objectFileAttribute>('digitalObject_has_objectFile', {
    digitalObject_digitalObjectID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'digitalObject',
        key: 'digitalObjectID'
      }
    },
    digitalObjectFileID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'file',
        key: 'fileID'
      }
    },
    digitalObjectFileLabel: {
      type: DataTypes.STRING,
      allowNull: true
    },
    digitalObjectFile_usesMountFormat: {
      type: DataTypes.STRING,
      allowNull: true,
      references: {
        model: 'mountFormat',
        key: 'mountFormatQID'
      }
    }
  }, {
    tableName: 'digitalObject_has_objectFile'
  });
};
