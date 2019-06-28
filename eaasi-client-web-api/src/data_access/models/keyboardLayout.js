module.exports = function(sequelize, DataTypes) {
  return sequelize.define('keyboardLayout', {
    keyboardLayoutQID: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    keyboardLayoutName: {
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
    tableName: 'keyboardLayout'
  });
};
