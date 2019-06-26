/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {digitalObject_has_alternativeIDInstance, digitalObject_has_alternativeIDAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<digitalObject_has_alternativeIDInstance, digitalObject_has_alternativeIDAttribute>('digitalObject_has_alternativeID', {
    digitalObject_digitalObjectID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'digitalObject',
        key: 'digitalObjectID'
      }
    },
    alternativeID_alternativeID: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'digitalObject_has_alternativeID'
  });
};
