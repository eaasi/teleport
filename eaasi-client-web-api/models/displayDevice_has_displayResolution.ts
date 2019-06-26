/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {displayDevice_has_displayResolutionInstance, displayDevice_has_displayResolutionAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<displayDevice_has_displayResolutionInstance, displayDevice_has_displayResolutionAttribute>('displayDevice_has_displayResolution', {
    displayDevice_displayDeviceID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'displayDevice',
        key: 'displayDeviceID'
      }
    },
    availableDisplayResolution: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'displayResolution',
        key: 'displayResolutionID'
      }
    }
  }, {
    tableName: 'displayDevice_has_displayResolution'
  });
};
