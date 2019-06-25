/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('machine_type', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    configured_machine_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'configured_machine',
        key: 'id'
      }
    }
  }, {
    tableName: 'machine_type'
  });
};
