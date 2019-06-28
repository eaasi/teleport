module.exports = function(sequelize, DataTypes) {
  return sequelize.define('keyboardDevice', {
    keyboardDeviceID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    keyboardDeviceQID: {
      type: DataTypes.STRING,
      allowNull: true
    },
    keyboardDeviceName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    keyboardDevice_keyboardLayout: {
      type: DataTypes.STRING,
      allowNull: true,
      references: {
        model: 'keyboardLayout',
        key: 'keyboardLayoutQID'
      }
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
    tableName: 'keyboardDevice'
  });
};
