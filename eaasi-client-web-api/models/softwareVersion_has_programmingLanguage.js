/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('softwareVersion_has_programmingLanguage', {
    softwareVersion_softwareVersionID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'softwareVersion',
        key: 'softwareVersionID'
      }
    },
    softwareVersion_programmingLanguageQID: {
      type: DataTypes.STRING,
      allowNull: true,
      references: {
        model: 'programmingLanguage',
        key: 'programmingLanguageQID'
      }
    }
  }, {
    tableName: 'softwareVersion_has_programmingLanguage'
  });
};
