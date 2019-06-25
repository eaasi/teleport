/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('computing_environment_event', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    computing_environment_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'computing_environment',
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
    tableName: 'computing_environment_event'
  });
};
