/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('configuredAudioDevice', {
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
