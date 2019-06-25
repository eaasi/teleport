/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('file_format_operation', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'file_format_operation'
  });
};
