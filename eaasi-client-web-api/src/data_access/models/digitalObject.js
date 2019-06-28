module.exports = function(sequelize, DataTypes) {
  return sequelize.define('digitalObject', {
    digitalObjectID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    digitalObjectName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    digitalObjectDescription: {
      type: DataTypes.STRING,
      allowNull: true
    },
    digitalObjectProductKey: {
      type: DataTypes.STRING,
      allowNull: true
    },
    digitalObjectHelpText: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    digitalObjectSystemRequirements: {
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
    tableName: 'digitalObject'
  });
};
