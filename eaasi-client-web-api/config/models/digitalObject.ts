/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {digitalObjectInstance, digitalObjectAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<digitalObjectInstance, digitalObjectAttribute>('digitalObject', {
    digitalObjectID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    digitalObjectName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    digitalObjectDescription: {
      type: DataTypes.STRING,
      allowNull: true
    },
    digitalObjectProductKey: {
      type: DataTypes.STRING,
      allowNull: true
    },
    digitalObjectHelpText: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    digitalObjectSystemRequirements: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'digitalObject'
  });
};
