/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('software_object_event', {
    software_object_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'software_object',
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
    tableName: 'software_object_event'
  });
};
