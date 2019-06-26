/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('softwareObject_has_alternateID', {
    softwareObject_softwareObjectID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'softwareObject',
        key: 'softwareObjectID'
      }
    },
    softwareObject_alternateID: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'softwareObject_has_alternateID'
  });
};
