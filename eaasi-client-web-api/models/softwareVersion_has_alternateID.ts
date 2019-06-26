/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {softwareVersion_has_alternateIDInstance, softwareVersion_has_alternateIDAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<softwareVersion_has_alternateIDInstance, softwareVersion_has_alternateIDAttribute>('softwareVersion_has_alternateID', {
    softwareVersion_softwareVersionID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'softwareVersion',
        key: 'softwareVersionID'
      }
    },
    softwareVersion_alternateID: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'softwareVersion_has_alternateID'
  });
};
