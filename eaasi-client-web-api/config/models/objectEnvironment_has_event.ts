/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {objectEnvironment_has_eventInstance, objectEnvironment_has_eventAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<objectEnvironment_has_eventInstance, objectEnvironment_has_eventAttribute>('objectEnvironment_has_event', {
    objectEnvironment_objectEnvironment_computingEnvironmentID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'objectEnvironment',
        key: 'objectEnvironment_objectEnvironment_computingEnvironmentID'
      }
    },
    objectEnvironment_objectEnvironment_digitalObjectID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    event_eventID: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'objectEnvironment_has_event'
  });
};
