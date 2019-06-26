/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {softwareFamily_hasPart_softwareProductInstance, softwareFamily_hasPart_softwareProductAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<softwareFamily_hasPart_softwareProductInstance, softwareFamily_hasPart_softwareProductAttribute>('softwareFamily_hasPart_softwareProduct', {
    softwarefamilyid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'softwareProduct',
        key: 'softwareProductID'
      }
    },
    haspart_softwareproduct: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'softwareProduct',
        key: 'softwareProductID'
      }
    }
  }, {
    tableName: 'softwareFamily_hasPart_softwareProduct'
  });
};
