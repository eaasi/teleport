/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('os_version_programming_language', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 'nextval(os_version_programming_language_id_seq::regclass)'
    },
    os_version_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'os_version',
        key: 'id'
      }
    },
    programming_language_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'programming_language',
        key: 'id'
      }
    }
  }, {
    tableName: 'os_version_programming_language'
  });
};
