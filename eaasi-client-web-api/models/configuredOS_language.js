/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('configuredOS_language', {
    configuredOS_configuredOperatingSystemID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'configuredOS',
        key: 'configuredOperatingSystemID'
      }
    },
    configuredOs_languageQID: {
      type: DataTypes.STRING,
      allowNull: true
    },
    configuredOS_primaryLanguage: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    tableName: 'configuredOS_language'
  });
};
