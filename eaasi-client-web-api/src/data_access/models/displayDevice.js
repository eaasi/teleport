module.exports = function(sequelize, DataTypes) {
  return sequelize.define('displayDevice', {
    displayDeviceID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    displayDeviceQID: {
      type: DataTypes.STRING,
      allowNull: true
    },
    displayDeviceName: {
      type: DataTypes.STRING,
      allowNull: true
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
    tableName: 'displayDevice'
  });
};
