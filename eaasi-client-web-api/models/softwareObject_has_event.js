/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('softwareObject_has_event', {
    softwareObject_softwareObjectID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'softwareObject',
        key: 'softwareObjectID'
      }
    },
    event_eventID: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'softwareObject_has_event'
  });
};
