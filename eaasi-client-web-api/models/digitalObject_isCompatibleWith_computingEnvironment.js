/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('digitalObject_isCompatibleWith_computingEnvironment', {
    digitalObject_digitalObjectID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'digitalObject',
        key: 'digitalObjectID'
      }
    },
    compatibleComputingEnvironmentID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'computingEnvironment',
        key: 'computingEnvironmentID'
      }
    }
  }, {
    tableName: 'digitalObject_isCompatibleWith_computingEnvironment'
  });
};
