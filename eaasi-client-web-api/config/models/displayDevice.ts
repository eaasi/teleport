/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {displayDeviceInstance, displayDeviceAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<displayDeviceInstance, displayDeviceAttribute>('displayDevice', {
    displayDeviceID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    displayDeviceQID: {
      type: DataTypes.STRING,
      allowNull: true
    },
    displayDeviceName: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'displayDevice'
  });
};
