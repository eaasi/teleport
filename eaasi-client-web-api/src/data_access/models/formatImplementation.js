module.exports = function(sequelize, DataTypes) {
  return sequelize.define('formatImplementation', {
    formatImplementationID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    formatImplementationName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    implementationExtension: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'fileExtension',
        key: 'fileExtensionID'
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
    tableName: 'formatImplementation'
  });
};
