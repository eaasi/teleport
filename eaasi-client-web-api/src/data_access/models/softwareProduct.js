module.exports = function(sequelize, DataTypes) {
  return sequelize.define('softwareProduct', {
    softwareProductID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    softwareProductQID: {
      type: DataTypes.STRING,
      allowNull: false
    },
    softwareProductDescription: {
      type: DataTypes.STRING,
      allowNull: true
    },
    softwareProductName: {
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
    tableName: 'softwareProduct'
  });
};
