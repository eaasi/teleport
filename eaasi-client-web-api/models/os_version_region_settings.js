/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('os_version_region_settings', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    timezone_qid: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    timezone_name: {
      type: DataTypes.STRING,
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
    tableName: 'os_version_region_settings'
  });
};
