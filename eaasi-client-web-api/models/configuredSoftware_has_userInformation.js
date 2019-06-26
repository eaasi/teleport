/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('configuredSoftware_has_userInformation', {
    configuredSoftware_configuredSoftwareManifestationID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'configuredSoftware',
        key: 'configuredSoftwareVersionID'
      }
    },
    userInformation_userInformationID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'userInformation',
        key: 'userInformationID'
      }
    }
  }, {
    tableName: 'configuredSoftware_has_userInformation'
  });
};
