/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('configured_network_event', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    configured_network_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'configured_network',
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
    tableName: 'configured_network_event'
  });
};
