module.exports = function(sequelize, DataTypes) {
  return sequelize.define('cpuArchitecture', {
    cpuArchitectureQID: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    cpuArchitectureName: {
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
    tableName: 'cpuArchitecture'
  });
};
