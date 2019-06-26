/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('audioDevice_hasEquivalent', {
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
