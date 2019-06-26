/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {computingEnvironment_has_eventInstance, computingEnvironment_has_eventAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<computingEnvironment_has_eventInstance, computingEnvironment_has_eventAttribute>('computingEnvironment_has_event', {
    computingEnvironment_computingEnvironmentID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'computingEnvironment',
        key: 'computingEnvironmentID'
      }
    },
    event_eventID: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'computingEnvironment_has_event'
  });
};
