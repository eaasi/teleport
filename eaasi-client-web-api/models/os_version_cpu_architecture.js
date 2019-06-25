/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('os_version_cpu_architecture', {
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
    cpu_architecture_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'cpu_architecture',
        key: 'id'
      }
    }
  }, {
    tableName: 'os_version_cpu_architecture'
  });
};
