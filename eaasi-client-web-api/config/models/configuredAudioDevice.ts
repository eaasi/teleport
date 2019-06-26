/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {configuredAudioDeviceInstance, configuredAudioDeviceAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<configuredAudioDeviceInstance, configuredAudioDeviceAttribute>('configuredAudioDevice', {
    configuredMachine_machineID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'configuredMachine',
        key: 'configuredMachineID'
      }
    },
    configuredAudioDevice_audioDeviceID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'audioDevice',
        key: 'audioDeviceID'
      }
    },
    configuredAudioDevice_irq: {
      type: DataTypes.STRING,
      allowNull: false
    },
    configuredAudioDevice_usesMachineInterface: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'configuredAudioDevice'
  });
};
