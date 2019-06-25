/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('configured_os', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    display_resolution: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    color_depth: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    region: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    timezone: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    datetime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    software_application_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    file_format_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'configured_os'
  });
};
