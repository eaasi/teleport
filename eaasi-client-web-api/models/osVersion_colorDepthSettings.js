/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('osVersion_colorDepthSettings', {
    osVersion_osVersionID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'osVersion',
        key: 'osVersionID'
      }
    },
    osVersion_colorDepthID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'colorDepth',
        key: 'colorDepthID'
      }
    }
  }, {
    tableName: 'osVersion_colorDepthSettings'
  });
};
