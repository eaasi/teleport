/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('osVersion_isCompatibleWith_configuredMachine', {
    osVersion_osVersionID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'osVersion',
        key: 'osVersionID'
      }
    },
    compatibleMachineID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'configuredMachine',
        key: 'configuredMachineID'
      }
    }
  }, {
    tableName: 'osVersion_isCompatibleWith_configuredMachine'
  });
};
