/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('software_version_format_implementation', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    software_version_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'software_version',
        key: 'id'
      }
    },
    format_implementation_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'format_implementation',
        key: 'id'
      }
    },
    operation_type_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'software_operation_type',
        key: 'id'
      }
    },
    is_default: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    tableName: 'software_version_format_implementation'
  });
};
