/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('softwareType', {
    softwareTypeQID: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    softwaretypename: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'softwareType'
  });
};
