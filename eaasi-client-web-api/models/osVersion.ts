/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {osVersionInstance, osVersionAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<osVersionInstance, osVersionAttribute>('osVersion', {
    osVersionID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    osVersionQID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    osVersionName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    osVersionDescription: {
      type: DataTypes.STRING,
      allowNull: true
    },
    osVersionNumber: {
      type: DataTypes.STRING,
      allowNull: true
    },
    osVersionPublicationDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    osVersionSystemRequirements: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    isVersionOf_osProduct: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'osVersion'
  });
};
