/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {displayDevice_has_displayInterfaceInstance, displayDevice_has_displayInterfaceAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<displayDevice_has_displayInterfaceInstance, displayDevice_has_displayInterfaceAttribute>('displayDevice_has_displayInterface', {
    displayDevice_displayDeviceID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'displayDevice',
        key: 'displayDeviceID'
      }
    },
    displayInterface_displayInterfaceID: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'displayDevice_has_displayInterface'
  });
};
