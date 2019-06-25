/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('os_version_compatible_computing_environment', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    os_version_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'os_version',
        key: 'id'
      }
    },
    configured_machine_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'configured_machine',
        key: 'id'
      }
    }
  }, {
    tableName: 'os_version_compatible_computing_environment'
  });
};
