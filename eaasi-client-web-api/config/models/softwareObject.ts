/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {softwareObjectInstance, softwareObjectAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<softwareObjectInstance, softwareObjectAttribute>('softwareObject', {
    softwareObjectID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    softwareObject_inNetwork: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    softwareObject_hasSourceOrg: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    softwareObjectProductKey: {
      type: DataTypes.STRING,
      allowNull: true
    },
    softwareObjectHelpText: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'softwareObject'
  });
};
