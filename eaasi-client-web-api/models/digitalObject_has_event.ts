/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {digitalObject_has_eventInstance, digitalObject_has_eventAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<digitalObject_has_eventInstance, digitalObject_has_eventAttribute>('digitalObject_has_event', {
    digitalObject_digialObjectID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'digitalObject',
        key: 'digitalObjectID'
      }
    },
    event_eventID: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'digitalObject_has_event'
  });
};
