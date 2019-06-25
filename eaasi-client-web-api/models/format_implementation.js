/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('format_implementation', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    label: {
      type: DataTypes.STRING,
      allowNull: true
    },
    file_extension: {
      type: DataTypes.STRING,
      allowNull: true
    },
    matching_format: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'format_implementation'
  });
};
