/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('software_version_license', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    software_version_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'software_version',
        key: 'id'
      }
    },
    software_license_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'software_license',
        key: 'id'
      }
    }
  }, {
    tableName: 'software_version_license'
  });
};
