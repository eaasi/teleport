/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {softwareEnvironment_has_eventInstance, softwareEnvironment_has_eventAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<softwareEnvironment_has_eventInstance, softwareEnvironment_has_eventAttribute>('softwareEnvironment_has_event', {
    softwareEnvironment_softwareEnvironmentID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'softwareEnvironment',
        key: 'softwareEnvironmentID'
      }
    },
    event_eventID: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'softwareEnvironment_has_event'
  });
};
