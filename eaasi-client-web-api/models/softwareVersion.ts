/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {softwareVersionInstance, softwareVersionAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<softwareVersionInstance, softwareVersionAttribute>('softwareVersion', {
    softwareVersionID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    softwareVersionQID: {
      type: DataTypes.STRING,
      allowNull: true
    },
    softwareVersionName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    softwareVersionDescription: {
      type: DataTypes.STRING,
      allowNull: false
    },
    softwareVersionNumber: {
      type: DataTypes.STRING,
      allowNull: true
    },
    softwareVersionPublicationDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    softwareVersionSystemRequirements: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'softwareProduct',
        key: 'softwareProductID'
      }
    },
    isVersionOf_softwareProduct: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'softwareVersion'
  });
};
