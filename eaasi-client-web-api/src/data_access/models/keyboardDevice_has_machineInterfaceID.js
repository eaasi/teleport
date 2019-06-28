module.exports = function(sequelize, DataTypes) {
  return sequelize.define('keyboardDevice_has_machineInterfaceID', {
    keyboardDevice_keyboardDeviceID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'keyboardDevice',
        key: 'keyboardDeviceID'
      }
    },
    keyboardDevice_machineInterfaceID: {
      type: DataTypes.INTEGER,
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
    tableName: 'keyboardDevice_has_machineInterfaceID'
  });
};
