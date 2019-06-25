/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('agent', {
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
    type: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    affiliation: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'agent'
  });
};
