/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {networkServiceInstance, networkServiceAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<networkServiceInstance, networkServiceAttribute>('networkService', {
    networkServiceID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    networkServiceName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    networkServiceQID: {
      type: DataTypes.STRING,
      allowNull: true
    },
    defaultPort: {
      type: DataTypes.STRING,
      allowNull: true
    },
    defaultPortRange: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'networkService'
  });
};
