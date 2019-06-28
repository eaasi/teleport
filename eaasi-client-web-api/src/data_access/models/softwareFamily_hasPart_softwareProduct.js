module.exports = function(sequelize, DataTypes) {
  return sequelize.define('softwareFamily_hasPart_softwareProduct', {
    softwareFamilyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'softwareProduct',
        key: 'softwareProductID'
      }
    },
    hasPart_softwareProduct: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'softwareProduct',
        key: 'softwareProductID'
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
    tableName: 'softwareFamily_hasPart_softwareProduct'
  });
};
