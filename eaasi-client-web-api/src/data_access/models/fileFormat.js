module.exports = function(sequelize, DataTypes) {
  return sequelize.define('fileFormat', {
    fileFormatQID: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    fileFormatName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    pronomID: {
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
    tableName: 'fileFormat'
  });
};
