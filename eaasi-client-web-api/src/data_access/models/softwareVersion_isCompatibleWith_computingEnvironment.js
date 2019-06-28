module.exports = function(sequelize, DataTypes) {
  return sequelize.define('softwareVersion_isCompatibleWith_computingEnvironment', {
    sofwareVersion_softwareVersionID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'softwareVersion',
        key: 'softwareVersionID'
      }
    },
    compatibleComputingEnvironmentID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'computingEnvironment',
        key: 'computingEnvironmentID'
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
    tableName: 'softwareVersion_isCompatibleWith_computingEnvironment'
  });
};
