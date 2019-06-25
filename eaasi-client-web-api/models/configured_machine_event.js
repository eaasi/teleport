/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('configured_machine_event', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    configured_machine_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'configured_machine',
        key: 'id'
      }
    },
    event_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'event',
        key: 'id'
      }
    }
  }, {
    tableName: 'configured_machine_event'
  });
};
