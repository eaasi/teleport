/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('configured_network', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'configured_network'
  });
};
