/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {audioDevice_hasEquivalentInstance, audioDevice_hasEquivalentAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<audioDevice_hasEquivalentInstance, audioDevice_hasEquivalentAttribute>('audioDevice_hasEquivalent', {
    audioDevice_audioDeviceID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'audioDevice',
        key: 'audioDeviceID'
      }
    },
    audioDevice_equivalentAudioDevice: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'audioDevice_hasEquivalent'
  });
};
