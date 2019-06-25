/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('file_format_extension_set', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    file_format_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'file_format',
        key: 'id'
      }
    },
    default: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    file_extension: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'file_format_extension_set'
  });
};
