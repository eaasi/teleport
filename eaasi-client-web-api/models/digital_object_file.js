/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('digital_object_file', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    digital_object_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'digital_object',
        key: 'id'
      }
    },
    label: {
      type: DataTypes.STRING,
      allowNull: true
    },
    mount_format_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    operation_type_id: {
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
    },
    file_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'file',
        key: 'id'
      }
    }
  }, {
    tableName: 'digital_object_file'
  });
};
