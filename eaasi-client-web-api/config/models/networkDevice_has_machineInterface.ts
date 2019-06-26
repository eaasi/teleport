/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {networkDevice_has_machineInterfaceInstance, networkDevice_has_machineInterfaceAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<networkDevice_has_machineInterfaceInstance, networkDevice_has_machineInterfaceAttribute>('networkDevice_has_machineInterface', {
    networkDevice_networkDeviceID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'networkDevice',
        key: 'networkDeviceID'
      }
    },
    networkDevice_machineInterfaceID: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'networkDevice_has_machineInterface'
  });
};
