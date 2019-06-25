/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('configured_os_event', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    configured_os_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'configured_os',
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
    tableName: 'configured_os_event'
  });
};
