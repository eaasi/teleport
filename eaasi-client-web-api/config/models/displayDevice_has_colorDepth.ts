/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {displayDevice_has_colorDepthInstance, displayDevice_has_colorDepthAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<displayDevice_has_colorDepthInstance, displayDevice_has_colorDepthAttribute>('displayDevice_has_colorDepth', {
    displayDevice_displayDeviceID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'displayDevice',
        key: 'displayDeviceID'
      }
    },
    colorDepth_colorDepthID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'colorDepth',
        key: 'colorDepthID'
      }
    }
  }, {
    tableName: 'displayDevice_has_colorDepth'
  });
};
