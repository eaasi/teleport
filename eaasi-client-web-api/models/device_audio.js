/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('device_audio', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'device',
        key: 'id'
      }
    },
    irq: {
      type: DataTypes.STRING,
      allowNull: true
    },
    uses_machine_interface: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'device_audio'
  });
};
