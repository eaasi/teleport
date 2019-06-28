module.exports = function(sequelize, DataTypes) {
  return sequelize.define('networkDevice', {
    networkDeviceID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    networkDeviceQID: {
      type: DataTypes.STRING,
      allowNull: true
    },
    networkDeviceName: {
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
    tableName: 'networkDevice'
  });
};
