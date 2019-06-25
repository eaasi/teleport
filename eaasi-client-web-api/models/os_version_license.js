/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('os_version_license', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    os_version_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'os_version',
        key: 'id'
      }
    },
    software_licence_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'software_license',
        key: 'id'
      }
    }
  }, {
    tableName: 'os_version_license'
  });
};
