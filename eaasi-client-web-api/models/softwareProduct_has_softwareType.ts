/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {softwareProduct_has_softwareTypeInstance, softwareProduct_has_softwareTypeAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<softwareProduct_has_softwareTypeInstance, softwareProduct_has_softwareTypeAttribute>('softwareProduct_has_softwareType', {
    softwareProduct_softwareProductID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'softwareProduct',
        key: 'softwareProductID'
      }
    },
    softwareProduct_softwareTypeQID: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'softwareType',
        key: 'softwareTypeQID'
      }
    }
  }, {
    tableName: 'softwareProduct_has_softwareType'
  });
};
