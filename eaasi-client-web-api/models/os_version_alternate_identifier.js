/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('os_version_alternate_identifier', {
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
    alternative_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'os_version_alternate_identifier'
  });
};
