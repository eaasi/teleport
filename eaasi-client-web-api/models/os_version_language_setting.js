/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('os_version_language_setting', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    qid: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    default_language: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    os_version_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'os_version',
        key: 'id'
      }
    }
  }, {
    tableName: 'os_version_language_setting'
  });
};
