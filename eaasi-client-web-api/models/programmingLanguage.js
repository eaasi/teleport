/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('programmingLanguage', {
    programmingLanguageQID: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    programmingLanguageName: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'programmingLanguage'
  });
};
