/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {audioDeviceInstance, audioDeviceAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<audioDeviceInstance, audioDeviceAttribute>('audioDevice', {
    audioDeviceID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    audioDeviceQID: {
      type: DataTypes.STRING,
      allowNull: true
    },
    audioDeviceName: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'audioDevice'
  });
};
