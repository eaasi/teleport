module.exports = function(sequelize, DataTypes) {
  return sequelize.define('storageDeviceType', {
    storageDeviceTypeID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    storageDeviceTypeQID: {
      type: DataTypes.STRING,
      allowNull: true
    },
    storageDeviceTypeName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'storageDeviceType'
  });
};
