/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('networkService', {
    networkServiceID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    networkServiceName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    networkServiceQID: {
      type: DataTypes.STRING,
      allowNull: true
    },
    defaultPort: {
      type: DataTypes.STRING,
      allowNull: true
    },
    defaultPortRange: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'networkService'
  });
};
