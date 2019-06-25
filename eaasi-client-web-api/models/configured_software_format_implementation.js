/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('configured_software_format_implementation', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    configured_software_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    format_implementation_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'format_implementation',
        key: 'id'
      }
    },
    format_operation_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'file_format_operation',
        key: 'id'
      }
    }
  }, {
    tableName: 'configured_software_format_implementation'
  });
};
