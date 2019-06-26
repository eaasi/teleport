/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {softwareProduct_has_alternateNameInstance, softwareProduct_has_alternateNameAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<softwareProduct_has_alternateNameInstance, softwareProduct_has_alternateNameAttribute>('softwareProduct_has_alternateName', {
    softwareProduct_softwareProductID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'softwareProduct',
        key: 'softwareProductID'
      }
    },
    softwareProduct_alternateNameID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'alternateName',
        key: 'alternateNameID'
      }
    }
  }, {
    tableName: 'softwareProduct_has_alternateName'
  });
};
