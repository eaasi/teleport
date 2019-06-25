/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('digital_object', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'digital_object'
  });
};
