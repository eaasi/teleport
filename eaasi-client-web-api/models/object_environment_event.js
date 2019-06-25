/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('object_environment_event', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    object_environment_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'object_environment',
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
    tableName: 'object_environment_event'
  });
};
