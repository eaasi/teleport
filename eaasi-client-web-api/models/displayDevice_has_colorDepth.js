/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('displayDevice_has_colorDepth', {
    displayDevice_displayDeviceID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'displayDevice',
        key: 'displayDeviceID'
      }
    },
    colorDepth_colorDepthID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'colorDepth',
        key: 'colorDepthID'
      }
    }
  }, {
    tableName: 'displayDevice_has_colorDepth'
  });
};
