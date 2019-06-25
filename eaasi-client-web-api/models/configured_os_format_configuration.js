/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('configured_os_format_configuration', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    configured_os_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'configured_os',
        key: 'id'
      }
    },
    uses_configured_software: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    opens_file_format: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'file_format',
        key: 'id'
      }
    }
  }, {
    tableName: 'configured_os_format_configuration'
  });
};
