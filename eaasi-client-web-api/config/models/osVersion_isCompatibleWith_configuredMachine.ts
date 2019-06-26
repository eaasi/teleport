/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {osVersion_isCompatibleWith_configuredMachineInstance, osVersion_isCompatibleWith_configuredMachineAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<osVersion_isCompatibleWith_configuredMachineInstance, osVersion_isCompatibleWith_configuredMachineAttribute>('osVersion_isCompatibleWith_configuredMachine', {
    osVersion_osVersionID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'osVersion',
        key: 'osVersionID'
      }
    },
    compatibleMachineID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'configuredMachine',
        key: 'configuredMachineID'
      }
    }
  }, {
    tableName: 'osVersion_isCompatibleWith_configuredMachine'
  });
};
