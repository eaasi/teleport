/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('software_version_developer', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    software_version_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'software_version',
        key: 'id'
      }
    },
    software_developer_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'software_developer',
        key: 'id'
      }
    }
  }, {
    tableName: 'software_version_developer'
  });
};
