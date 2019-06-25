/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('device_pointer', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'device',
        key: 'id'
      }
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'device_pointer'
  });
};
