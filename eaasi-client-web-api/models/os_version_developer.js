/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('os_version_developer', {
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
    developer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'software_developer',
        key: 'id'
      }
    }
  }, {
    tableName: 'os_version_developer'
  });
};
