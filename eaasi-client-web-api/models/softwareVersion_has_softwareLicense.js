/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('softwareVersion_has_softwareLicense', {
    softwareVersion_softwareVersionID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'softwareVersion',
        key: 'softwareVersionID'
      }
    },
    softwareVersion_softwareLicenseQID: {
      type: DataTypes.STRING,
      allowNull: true,
      references: {
        model: 'softwareLicense',
        key: 'softwareLicenseQID'
      }
    }
  }, {
    tableName: 'softwareVersion_has_softwareLicense'
  });
};
