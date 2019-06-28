module.exports = function(sequelize, DataTypes) {
  return sequelize.define('colorDepth', {
    colorDepthID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    colorDepthName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    bitDepth: {
      type: DataTypes.INTEGER,
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
    tableName: 'colorDepth'
  });
};
