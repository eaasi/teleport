module.exports = function(sequelize, DataTypes) {
  return sequelize.define('readWriteStatus', {
    readWriteStatusID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    readWriteStatusName: {
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
    tableName: 'readWriteStatus'
  });
};
