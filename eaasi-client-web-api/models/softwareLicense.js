/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('softwareLicense', {
    softwareLicenseQID: {
      type: DataTypes.STRING,
      allowNull: false
    },
    softwareLicenseName: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'softwareLicense'
  });
};
