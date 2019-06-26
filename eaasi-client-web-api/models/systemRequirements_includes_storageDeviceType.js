/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('systemRequirements_includes_storageDeviceType', {
    systemRequirements_systemRequirementsID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'systemRequirements',
        key: 'systemRequirementsID'
      }
    },
    systemRequirements_storageDeviceTypeID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'storageDeviceType',
        key: 'storageDeviceTypeID'
      }
    }
  }, {
    tableName: 'systemRequirements_includes_storageDeviceType'
  });
};
