module.exports = function(sequelize, DataTypes) {
  return sequelize.define('softwareProduct_has_softwareType', {
    softwareProduct_softwareProductID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'softwareProduct',
        key: 'softwareProductID'
      }
    },
    softwareProduct_softwareTypeQID: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'softwareType',
        key: 'softwareTypeQID'
      }
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
    tableName: 'softwareProduct_has_softwareType'
  });
};
