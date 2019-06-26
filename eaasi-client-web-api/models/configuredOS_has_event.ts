/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {configuredOS_has_eventInstance, configuredOS_has_eventAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<configuredOS_has_eventInstance, configuredOS_has_eventAttribute>('configuredOS_has_event', {
    configuredOS_configuredOperatingSystemID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'configuredOS',
        key: 'configuredOperatingSystemID'
      }
    },
    event_eventID: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'configuredOS_has_event'
  });
};
