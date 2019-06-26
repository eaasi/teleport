/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('storageDevice', {
    storageDeviceID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    storageDeviceQID: {
      type: DataTypes.STRING,
      allowNull: true
    },
    storageDeviceName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    storageDeviceType: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'storageDeviceType',
        key: 'storageDeviceTypeID'
      }
    },
    storageVolumeBytes: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    storageDevice_readWriteStatusID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'readWriteStatus',
        key: 'readWriteStatusID'
      }
    }
  }, {
    tableName: 'storageDevice'
  });
};
