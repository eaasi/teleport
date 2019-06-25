/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('software_object_related_os_version', {
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
        model: 'software_version',
        key: 'id'
      }
    },
    os_version_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'os_version',
        key: 'id'
      }
    }
  }, {
    tableName: 'software_object_related_os_version'
  });
};
