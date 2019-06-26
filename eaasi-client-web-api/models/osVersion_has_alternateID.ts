/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {osVersion_has_alternateIDInstance, osVersion_has_alternateIDAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<osVersion_has_alternateIDInstance, osVersion_has_alternateIDAttribute>('osVersion_has_alternateID', {
    osVersion_osVersionID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'osVersion',
        key: 'osVersionID'
      }
    },
    osVersion_alternativeID: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'osVersion_has_alternateID'
  });
};
