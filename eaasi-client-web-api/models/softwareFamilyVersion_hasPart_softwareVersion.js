/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('softwareFamilyVersion_hasPart_softwareVersion', {
    softwareFamilyVersionID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'softwareVersion',
        key: 'softwareVersionID'
      }
    },
    hasPart_softwareVersion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'softwareVersion',
        key: 'softwareVersionID'
      }
    }
  }, {
    tableName: 'softwareFamilyVersion_hasPart_softwareVersion'
  });
};
