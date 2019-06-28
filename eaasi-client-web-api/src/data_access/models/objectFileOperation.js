module.exports = function(sequelize, DataTypes) {
  return sequelize.define('objectFileOperation', {
    operationID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    operationName: {
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
    tableName: 'objectFileOperation'
  });
};
