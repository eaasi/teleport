module.exports = function(sequelize, DataTypes) {
  return sequelize.define('gpuDevice', {
    gpuDeviceID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    gpuDeviceQID: {
      type: DataTypes.STRING,
      allowNull: true
    },
    gpuDeviceName: {
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
    tableName: 'gpuDevice'
  });
};
