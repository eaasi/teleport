module.exports = function(sequelize, DataTypes) {
  return sequelize.define('keyboardDevice_has_language', {
    keyboardDevice_keyboardDeviceID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'keyboardDevice',
        key: 'keyboardDeviceID'
      }
    },
    keyboardDevice_languageQID: {
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
    tableName: 'keyboardDevice_has_language'
  });
};
