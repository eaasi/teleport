/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {configuredNetworkInstance, configuredNetworkAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<configuredNetworkInstance, configuredNetworkAttribute>('configuredNetwork', {
    configuredNetworkID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    configuredNetworkName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    configuredNetworkDescription: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'configuredNetwork'
  });
};
