/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('software_environment_disk_image', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    mount_point: {
      type: DataTypes.STRING,
      allowNull: true
    },
    file_system_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'file_system',
        key: 'id'
      }
    },
    storage_capacity_bytes: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    storage_used_bytes: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    storage_remaining_bytes: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    software_environment_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'software_environment',
        key: 'id'
      }
    }
  }, {
    tableName: 'software_environment_disk_image'
  });
};
