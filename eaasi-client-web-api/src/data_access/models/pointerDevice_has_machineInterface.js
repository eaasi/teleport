module.exports = function(sequelize, DataTypes) {
  return sequelize.define('pointerDevice_has_machineInterface', {
    pointerDevice_pointerDeviceID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'pointerDevice',
        key: 'pointerDeviceID'
      }
    },
    pointerDevice_machineInterfaceID: {
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
    tableName: 'pointerDevice_has_machineInterface'
  });
};
