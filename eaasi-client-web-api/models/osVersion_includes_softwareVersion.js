/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('osVersion_includes_softwareVersion', {
    osVersion_osVersionID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'osVersion',
        key: 'osVersionID'
      }
    },
    osVersion_softwareVersionID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'softwareVersion',
        key: 'softwareVersionID'
      }
    }
  }, {
    tableName: 'osVersion_includes_softwareVersion'
  });
};
