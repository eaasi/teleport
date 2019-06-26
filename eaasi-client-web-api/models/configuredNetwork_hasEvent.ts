/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {configuredNetwork_hasEventInstance, configuredNetwork_hasEventAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<configuredNetwork_hasEventInstance, configuredNetwork_hasEventAttribute>('configuredNetwork_hasEvent', {
    configuredNetwork_configuredNetworkID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'configuredNetwork',
        key: 'configuredNetworkID'
      }
    },
    event_eventID: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'configuredNetwork_hasEvent'
  });
};
