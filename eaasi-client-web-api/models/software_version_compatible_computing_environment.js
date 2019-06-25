/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('software_version_compatible_computing_environment', {
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
    computing_environment_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'computing_environment',
        key: 'id'
      }
    }
  }, {
    tableName: 'software_version_compatible_computing_environment'
  });
};
