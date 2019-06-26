/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('configuredOS_has_formatOperation', {
    configuredOS_configuredOperatingSystemID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'configuredOS',
        key: 'configuredOperatingSystemID'
      }
    },
    formatOperation_opensFileFormat: {
      type: DataTypes.STRING,
      allowNull: true,
      references: {
        model: 'fileFormat',
        key: 'fileFormatQID'
      }
    },
    formatOperation_usesConfiguredSoftware: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'configuredSoftware',
        key: 'configuredSoftwareVersionID'
      }
    }
  }, {
    tableName: 'configuredOS_has_formatOperation'
  });
};
