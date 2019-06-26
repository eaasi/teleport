/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {softwareObject_has_alternateIDInstance, softwareObject_has_alternateIDAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<softwareObject_has_alternateIDInstance, softwareObject_has_alternateIDAttribute>('softwareObject_has_alternateID', {
    softwareObject_softwareObjectID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'softwareObject',
        key: 'softwareObjectID'
      }
    },
    softwareObject_alternateID: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'softwareObject_has_alternateID'
  });
};
