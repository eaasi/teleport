/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('software_object_file', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    software_object_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'software_object',
        key: 'id'
      }
    },
    file_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'file',
        key: 'id'
      }
    },
    mount_format_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    operation_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'software_operation_type',
        key: 'id'
      }
    },
    operation_order: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'software_object_file'
  });
};
