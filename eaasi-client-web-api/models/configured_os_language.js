/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('configured_os_language', {
    configured_os_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'configured_os',
        key: 'id'
      }
    },
    qid: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    primary_language: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'configured_os_language'
  });
};
