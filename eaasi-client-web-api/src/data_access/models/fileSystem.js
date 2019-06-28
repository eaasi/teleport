module.exports = function(sequelize, DataTypes) {
  return sequelize.define('fileSystem', {
    fileSystemQID: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    fileSystemName: {
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
    tableName: 'fileSystem'
  });
};
