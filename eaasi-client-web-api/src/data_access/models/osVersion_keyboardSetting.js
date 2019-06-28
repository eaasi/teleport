module.exports = function(sequelize, DataTypes) {
  return sequelize.define('osVersion_keyboardSetting', {
    osVersion_osVersionID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'osVersion',
        key: 'osVersionID'
      }
    },
    osVersion_keyboardSettingLanguage: {
      type: DataTypes.STRING,
      allowNull: false
    },
    osVersion_keyboardSettingLayout: {
      type: DataTypes.STRING,
      allowNull: true,
      references: {
        model: 'keyboardLayout',
        key: 'keyboardLayoutQID'
      }
    },
    osVersion_keyboardSettingName: {
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
    tableName: 'osVersion_keyboardSetting'
  });
};
