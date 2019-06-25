/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('device_keyboard', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'device',
        key: 'id'
      }
    },
    layout_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    language_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'device_keyboard'
  });
};
