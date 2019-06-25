/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('os_version_system_requirements', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    requirements_summary: {
      type: DataTypes.STRING,
      allowNull: true
    },
    minimum_ram: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    minimum_disk_space: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    minimum_color_depth: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    minimum_aspect_ratio: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    internet_required: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    minimum_mbps: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    os_version_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'os_version',
        key: 'id'
      }
    }
  }, {
    tableName: 'os_version_system_requirements'
  });
};
